import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    StatusBar,
    Modal,
    ActivityIndicator,
    TextInput,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles/home';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';

export interface Product {
    id: number | string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    created_at?: string;
    oldPrice?: number;
    rating?: number;
    reviews?: number;
    image?: string;
    tag?: string;
    description?: string;
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: supabaseError } = await supabase
                .from('products')
                .select('*');

            if (supabaseError) {
                throw new Error(supabaseError.message);
            }

            if (data) {
                setProducts(data as Product[]);
            }
        } catch (err: any) {
            const message = err.message || 'Error inesperado al cargar productos';
            console.error('Error al obtener productos:', message);
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        refetch: fetchProducts,
    };
};

export default function HomeScreen() {
    const { user, signOut } = useAuth();
    const navigation = useNavigation<any>();
    const { products, loading, error, refetch } = useProducts();

    // Estados de UI y Filtros
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [favorites, setFavorites] = useState<Record<string, boolean>>({});
    const [cartCount, setCartCount] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // Nombre amigable del usuario para el saludo
    const userGreetingName = useMemo(() => {
        if (!user) return 'Deportista';
        const metaName = user.user_metadata?.name || user.user_metadata?.full_name;
        if (metaName) return metaName.split(' ')[0];
        if (user.email) return user.email.split('@')[0];
        return 'Deportista';
    }, [user]);

    // Cargar favoritos del usuario desde Supabase si está logueado
    useEffect(() => {
        if (!user) return;
        const loadUserFavorites = async () => {
            try {
                const { data } = await supabase
                    .from('favorites')
                    .select('product_id')
                    .eq('user_id', user.id);

                if (data && data.length > 0) {
                    const map: Record<string, boolean> = {};
                    data.forEach((item: any) => {
                        map[String(item.product_id)] = true;
                    });
                    setFavorites(map);
                }
            } catch (_) {}
        };
        loadUserFavorites();
    }, [user]);

    // Cargar cantidad de items en carrito del usuario
    useEffect(() => {
        if (!user) return;
        const loadCartCount = async () => {
            try {
                const { count } = await supabase
                    .from('cart_items')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', user.id);

                if (count !== null) {
                    setCartCount(count);
                }
            } catch (_) {}
        };
        loadCartCount();
    }, [user]);

    // Categorías dinámicas a partir de los productos
    const categories = useMemo(() => {
        const rawCategories = products.map((p) => p.category).filter(Boolean);
        return ['Todos', ...Array.from(new Set(rawCategories))];
    }, [products]);

    // Productos filtrados por búsqueda y categoría
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === 'Todos' ||
                product.category?.toLowerCase() === selectedCategory.toLowerCase();

            const query = searchQuery.trim().toLowerCase();
            const matchesSearch =
                !query ||
                product.name.toLowerCase().includes(query) ||
                (product.category && product.category.toLowerCase().includes(query)) ||
                (product.description && product.description.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    // Manejar Favoritos (local + Supabase si hay sesión)
    const toggleFavorite = async (productId: string | number) => {
        const prodIdStr = String(productId);
        const willBeFav = !favorites[prodIdStr];

        setFavorites((prev) => ({
            ...prev,
            [prodIdStr]: willBeFav,
        }));

        if (user) {
            try {
                if (willBeFav) {
                    await supabase.from('favorites').upsert({
                        user_id: user.id,
                        product_id: productId,
                    });
                } else {
                    await supabase
                        .from('favorites')
                        .delete()
                        .eq('user_id', user.id)
                        .eq('product_id', productId);
                }
            } catch (err) {
                console.error('Error sincronizando favorito:', err);
            }
        }
    };

    // Añadir al Carrito asociado exclusivamente al usuario activo
    const handleAddToCart = async (product: Product) => {
        if (!user) {
            Alert.alert(
                'Inicia Sesión',
                'Debes iniciar sesión para agregar productos a tu carrito.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Iniciar Sesión', onPress: () => navigation.navigate('Login') },
                ]
            );
            return;
        }

        try {
            // Verificar si el producto ya está en el carrito de este usuario
            const { data: existingItem } = await supabase
                .from('cart_items')
                .select('id, quantity')
                .eq('user_id', user.id)
                .eq('product_id', product.id)
                .maybeSingle();

            if (existingItem) {
                // Si ya existe, sumamos 1 a la cantidad
                const { error: updateError } = await supabase
                    .from('cart_items')
                    .update({ quantity: (existingItem.quantity || 1) + 1 })
                    .eq('id', existingItem.id);

                if (updateError) throw updateError;
            } else {
                // Si es nuevo, lo insertamos con su user_id
                const { error: insertError } = await supabase
                    .from('cart_items')
                    .insert({
                        user_id: user.id,
                        product_id: product.id,
                        quantity: 1,
                    });

                if (insertError) throw insertError;
                setCartCount((prev) => prev + 1);
            }

            Alert.alert('¡Añadido al carrito!', `"${product.name}" ha sido agregado a tu carrito personal.`);
        } catch (err: any) {
            console.error('Error al agregar al carrito:', err);
            Alert.alert('Error', 'No se pudo agregar el producto al carrito.');
        }
    };

    const handleProductPress = (product: Product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const goToCart = () => {
        navigation.navigate('Car');
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const handleUserMenu = () => {
        Alert.alert(
            'Mi Cuenta',
            `Conectado como: ${user?.email || 'Invitado'}`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    style: 'destructive',
                    onPress: async () => {
                        await signOut();
                        navigation.navigate('Login');
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" />

            {/* Header Moderno y Personalizado */}
            <View style={styles.header}>
                <View style={styles.headerUser}>
                    <Text style={styles.greetingText}>Hola, {userGreetingName} 👋</Text>
                    <Text style={styles.brandTitle}>
                        H<Text style={styles.brandHighlight}>Sport</Text> Store
                    </Text>
                </View>

                <View style={styles.headerActions}>
                    {/* Botón de Perfil / Logout */}
                    <TouchableOpacity
                        style={styles.userAvatarBtn}
                        onPress={handleUserMenu}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.userAvatarText}>
                            {userGreetingName.charAt(0).toUpperCase()}
                        </Text>
                    </TouchableOpacity>

                    {/* Notificaciones */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() =>
                            Alert.alert('Notificaciones', 'No tienes novedades pendientes en este momento.')
                        }
                        activeOpacity={0.7}
                    >
                        <Text style={styles.iconButtonText}>🔔</Text>
                    </TouchableOpacity>

                    {/* Carrito con Contador */}
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={goToCart}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.iconButtonText}>🛒</Text>
                        {cartCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Barra de Búsqueda Intuitiva */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar zapatillas, ropa, accesorios..."
                    placeholderTextColor="#94A3B8"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearSearch}
                        onPress={() => setSearchQuery('')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.clearSearchText}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#2563EB']}
                    />
                }
            >
                {/* Banner Promocional Estilo HSport */}
                {!searchQuery && (
                    <View style={styles.bannerCard}>
                        <View style={styles.bannerBadge}>
                            <Text style={styles.bannerBadgeText}>NUEVA TEMPORADA</Text>
                        </View>
                        <Text style={styles.bannerTitle}>Equípate para ganar</Text>
                        <Text style={styles.bannerSubtitle}>
                            Hasta 30% de descuento en calzado y ropa técnica seleccionada.
                        </Text>
                        <TouchableOpacity
                            style={styles.bannerButton}
                            onPress={() => setSelectedCategory('Todos')}
                            activeOpacity={0.85}
                        >
                            <Text style={styles.bannerButtonText}>Explorar Colección</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Filtro de Categorías Horizontal */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesList}
                >
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat;
                        return (
                            <TouchableOpacity
                                key={cat}
                                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                                onPress={() => setSelectedCategory(cat)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        isActive && styles.categoryTextActive,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Título de Sección con Conteo */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        {selectedCategory === 'Todos' ? 'Destacados' : selectedCategory}
                    </Text>
                    <Text style={styles.sectionAction}>
                        {filteredProducts.length} producto{filteredProducts.length === 1 ? '' : 's'}
                    </Text>
                </View>

                {/* Grilla de Productos */}
                <View style={styles.productsGrid}>
                    {loading ? (
                        <View style={styles.emptyState}>
                            <ActivityIndicator size="large" color="#2563EB" />
                            <Text style={styles.emptyStateText}>Cargando catálogo...</Text>
                        </View>
                    ) : error ? (
                        <View style={styles.emptyState}>
                            <Text style={{ fontSize: 32 }}>⚠️</Text>
                            <Text style={styles.emptyStateText}>{error}</Text>
                            <TouchableOpacity
                                onPress={refetch}
                                style={{
                                    marginTop: 12,
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    backgroundColor: '#2563EB',
                                    borderRadius: 10,
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                    Reintentar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : filteredProducts.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Text style={{ fontSize: 36 }}>🔍</Text>
                            <Text style={styles.emptyStateText}>
                                {searchQuery
                                    ? `No encontramos productos para "${searchQuery}"`
                                    : 'No hay productos disponibles en esta categoría'}
                            </Text>
                            {(searchQuery || selectedCategory !== 'Todos') && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('Todos');
                                    }}
                                    style={{
                                        marginTop: 12,
                                        paddingHorizontal: 16,
                                        paddingVertical: 8,
                                        backgroundColor: '#EEF2FF',
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>
                                        Limpiar filtros
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        filteredProducts.map((product) => {
                            const productIdStr = String(product.id);
                            const isFav = !!favorites[productIdStr];

                            return (
                                <View key={productIdStr} style={styles.productCard}>
                                    {/* Etiqueta / Tag */}
                                    {product.tag && (
                                        <View style={styles.tagBadge}>
                                            <Text style={styles.tagBadgeText}>{product.tag}</Text>
                                        </View>
                                    )}

                                    {/* Botón Favorito */}
                                    <TouchableOpacity
                                        style={styles.favButton}
                                        onPress={() => toggleFavorite(productIdStr)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.favButtonText}>
                                            {isFav ? '❤️' : '🤍'}
                                        </Text>
                                    </TouchableOpacity>

                                    {/* Contenido Tocable que abre Modal */}
                                    <TouchableOpacity
                                        activeOpacity={0.85}
                                        onPress={() => handleProductPress(product)}
                                    >
                                        <Image
                                            source={{ uri: product.image || DEFAULT_IMAGE }}
                                            style={styles.productImage}
                                            resizeMode="cover"
                                        />

                                        {product.category && (
                                            <Text style={styles.productCategory}>
                                                {product.category}
                                            </Text>
                                        )}

                                        <Text
                                            style={styles.productName}
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                        >
                                            {product.name}
                                        </Text>

                                        {product.rating != null && (
                                            <View style={styles.productRatingRow}>
                                                <Text style={{ fontSize: 11 }}>⭐</Text>
                                                <Text style={styles.productRatingText}>
                                                    {product.rating} ({product.reviews ?? 0})
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>

                                    {/* Footer con Precio y Botón de Carrito Rápido */}
                                    <View style={styles.productFooter}>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.productPrice}>
                                                ${Number(product.price || 0).toFixed(2)}
                                            </Text>
                                            {product.oldPrice != null && (
                                                <Text style={styles.productOldPrice}>
                                                    ${Number(product.oldPrice || 0).toFixed(2)}
                                                </Text>
                                            )}
                                        </View>

                                        <TouchableOpacity
                                            style={styles.addCartButton}
                                            onPress={() => handleAddToCart(product)}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={styles.addCartButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </View>
            </ScrollView>

            {/* Modal Bottom-Sheet de Detalle del Producto */}
            <Modal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Cabecera del modal con botón de cierre */}
                        <View style={styles.modalHeaderRow}>
                            <View style={styles.modalCategoryBadge}>
                                <Text style={styles.modalCategoryBadgeText}>
                                    {selectedProduct?.category || 'HSport'}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.modalCloseIconBtn}
                                onPress={() => setModalVisible(false)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.modalCloseIconText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {selectedProduct && (
                            <>
                                <Image
                                    source={{ uri: selectedProduct.image || DEFAULT_IMAGE }}
                                    style={styles.modalImage}
                                    resizeMode="cover"
                                />

                                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>

                                <View style={styles.modalPriceRow}>
                                    <Text style={styles.modelTextPrice}>
                                        ${Number(selectedProduct.price || 0).toFixed(2)}
                                    </Text>
                                    {selectedProduct.oldPrice != null && (
                                        <Text style={styles.productOldPrice}>
                                            ${Number(selectedProduct.oldPrice || 0).toFixed(2)}
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.modalStockRow}>
                                    <View style={styles.modalStockIndicator} />
                                    <Text style={styles.modalStockText}>
                                        {selectedProduct.quantity > 0
                                            ? `Disponible (${selectedProduct.quantity} en stock)`
                                            : 'Agotado'}
                                    </Text>
                                </View>

                                {selectedProduct.description && (
                                    <Text style={styles.modalDesc} numberOfLines={3}>
                                        {selectedProduct.description}
                                    </Text>
                                )}

                                {/* Botones de Acción */}
                                <View style={styles.modalButtonsRow}>
                                    <TouchableOpacity
                                        style={styles.modalAddToCartBtn}
                                        onPress={() => {
                                            handleAddToCart(selectedProduct);
                                            setModalVisible(false);
                                        }}
                                        activeOpacity={0.85}
                                    >
                                        <Text style={styles.modalAddToCartBtnText}>
                                            🛒 Añadir al Carrito
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.modalCloseButton}
                                        onPress={() => setModalVisible(false)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.modalCloseButtonText}>Cerrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}