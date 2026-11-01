import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../../styles/car';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';

export interface CartItem {
    id: string | number;
    productId: string | number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80';

export default function CarScreen() {
    const navigation = useNavigation<any>();
    const { user } = useAuth();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Cargar los items del carrito pertenecientes EXCLUSIVAMENTE al usuario activo
    const fetchUserCart = useCallback(async () => {
        if (!user) {
            setCartItems([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            // Intento 1: Consulta con JOIN relacional a products
            const { data, error } = await supabase
                .from('cart_items')
                .select(`
                    id,
                    quantity,
                    product_id,
                    products (
                        id,
                        name,
                        price,
                        image
                    )
                `)
                .eq('user_id', user.id);

            if (!error && data && data.length > 0) {
                const formatted: CartItem[] = data.map((item: any) => ({
                    id: item.id,
                    productId: item.product_id,
                    name: item.products?.name || 'Producto',
                    price: Number(item.products?.price) || 0,
                    quantity: item.quantity,
                    image: item.products?.image || DEFAULT_IMAGE,
                }));
                setCartItems(formatted);
                return;
            }

            // Intento 2 (Fallback si no hay clave foránea configurada): Consulta en dos pasos
            const { data: rawItems, error: itemsErr } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', user.id);

            if (itemsErr || !rawItems || rawItems.length === 0) {
                setCartItems([]);
                return;
            }

            const productIds = rawItems.map((i: any) => i.product_id);
            const { data: productsData } = await supabase
                .from('products')
                .select('*')
                .in('id', productIds);

            const prodMap = new Map((productsData || []).map((p: any) => [String(p.id), p]));

            const formatted: CartItem[] = rawItems.map((item: any) => {
                const p = prodMap.get(String(item.product_id));
                return {
                    id: item.id,
                    productId: item.product_id,
                    name: p?.name || 'Producto',
                    price: Number(p?.price) || 0,
                    quantity: item.quantity,
                    image: p?.image || DEFAULT_IMAGE,
                };
            });

            setCartItems(formatted);
        } catch (err) {
            console.error('Error al cargar carrito del usuario:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Recargar cada vez que la pantalla de carrito entra en foco
    useFocusEffect(
        useCallback(() => {
            fetchUserCart();
        }, [fetchUserCart])
    );

    // Cálculo dinámico del total
    const total = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * item.quantity, 0);
    }, [cartItems]);

    // Modificar cantidad (+ / -) y sincronizar en Supabase
    const updateQuantity = async (id: string | number, delta: number) => {
        const item = cartItems.find((i) => i.id === id);
        if (!item) return;

        const newQuantity = item.quantity + delta;

        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }

        // Actualización optimista local
        setCartItems((prevItems) =>
            prevItems.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
        );

        // Actualización en Supabase restringida al user.id
        if (user) {
            try {
                await supabase
                    .from('cart_items')
                    .update({ quantity: newQuantity })
                    .eq('id', id)
                    .eq('user_id', user.id);
            } catch (err) {
                console.error('Error al actualizar cantidad en Supabase:', err);
            }
        }
    };

    // Eliminar producto individual
    const removeItem = async (id: string | number) => {
        // Actualización local
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

        // Borrado en Supabase restringido al user.id
        if (user) {
            try {
                await supabase
                    .from('cart_items')
                    .delete()
                    .eq('id', id)
                    .eq('user_id', user.id);
            } catch (err) {
                console.error('Error al eliminar producto de Supabase:', err);
            }
        }
    };

    // Vaciar carrito completo del usuario
    const clearCart = () => {
        if (cartItems.length === 0) return;
        Alert.alert(
            'Vaciar carrito',
            '¿Deseas eliminar todos los productos de tu carrito personal?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Vaciar',
                    style: 'destructive',
                    onPress: async () => {
                        setCartItems([]);
                        if (user) {
                            try {
                                await supabase
                                    .from('cart_items')
                                    .delete()
                                    .eq('user_id', user.id);
                            } catch (err) {
                                console.error('Error al vaciar carrito:', err);
                            }
                        }
                    },
                },
            ]
        );
    };

    // Acción de pago
    const handleCheckout = () => {
        Alert.alert(
            'Confirmación de compra',
            `Total a pagar: $${total.toFixed(2)}\n¿Deseas procesar el pedido?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Continuar',
                    onPress: async () => {
                        Alert.alert('¡Éxito!', 'Tu pedido ha sido procesado correctamente.');
                        setCartItems([]);
                        if (user) {
                            await supabase
                                .from('cart_items')
                                .delete()
                                .eq('user_id', user.id);
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" />

            {/* Header Minimalista */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerBackBtn}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.headerBackText}>←</Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Mi Carrito</Text>

                {cartItems.length > 0 ? (
                    <TouchableOpacity
                        style={styles.headerClearBtn}
                        onPress={clearCart}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.headerClearText}>Vaciar</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 38 }} />
                )}
            </View>

            {/* Lista de Productos o Estados */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {loading ? (
                    <View style={styles.emptyState}>
                        <ActivityIndicator size="large" color="#2563EB" />
                        <Text style={styles.emptyStateSubtitle}>Cargando tu carrito...</Text>
                    </View>
                ) : !user ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateIcon}>🔒</Text>
                        <Text style={styles.emptyStateTitle}>Inicia sesión</Text>
                        <Text style={styles.emptyStateSubtitle}>
                            Debes ingresar a tu cuenta para ver tus productos guardados.
                        </Text>
                        <TouchableOpacity
                            style={styles.emptyStateBtn}
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.emptyStateBtnText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                ) : cartItems.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateIcon}>🛒</Text>
                        <Text style={styles.emptyStateTitle}>Tu carrito está vacío</Text>
                        <Text style={styles.emptyStateSubtitle}>
                            Añade productos de la tienda para comenzar.
                        </Text>
                        <TouchableOpacity
                            style={styles.emptyStateBtn}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.emptyStateBtnText}>Explorar Productos</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.itemsContainer}>
                        {cartItems.map((item) => (
                            <View key={String(item.id)} style={styles.cartCard}>
                                <Image
                                    source={{ uri: item.image || DEFAULT_IMAGE }}
                                    style={styles.cartCardImage}
                                    resizeMode="cover"
                                />

                                <View style={styles.cartCardInfo}>
                                    <View style={styles.cartCardTopRow}>
                                        <Text
                                            style={styles.cartCardTitle}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.name}
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.deleteBtn}
                                            onPress={() => removeItem(item.id)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.deleteBtnText}>✕</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.cartCardBottomRow}>
                                        <Text style={styles.cartCardPrice}>
                                            ${((Number(item.price) || 0) * item.quantity).toFixed(2)}
                                        </Text>

                                        {/* Selector de Cantidad */}
                                        <View style={styles.stepper}>
                                            <TouchableOpacity
                                                style={styles.stepperBtn}
                                                onPress={() => updateQuantity(item.id, -1)}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={styles.stepperBtnText}>−</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.stepperValue}>{item.quantity}</Text>

                                            <TouchableOpacity
                                                style={styles.stepperBtn}
                                                onPress={() => updateQuantity(item.id, 1)}
                                                activeOpacity={0.7}
                                            >
                                                <Text style={styles.stepperBtnText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {/* Footer de Pago Minimalista (Solo si hay productos) */}
            {cartItems.length > 0 && (
                <SafeAreaView edges={['bottom']} style={styles.checkoutFooter}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.checkoutBtn}
                        onPress={handleCheckout}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.checkoutBtnText}>Continuar al Pago</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )}
        </SafeAreaView>
    );
}