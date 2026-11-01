import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../utils/supabase';
import { styles } from '../../../styles/register';


export default function RegisterScreen() {
    const navigation = useNavigation<any>();

    // Estados de formulario
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Estados de UI
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);




    async function Register() {
        if (!email.trim() || !password || !fullName.trim()) {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: fullName.trim(),
                        full_name: fullName.trim(),
                        profile_type: 'personal',
                    },
                },
            });

            if (error) {
                Alert.alert('Error al registrar', error.message);
                return;
            }

            console.log('Resultado Supabase signUp:', {
                hasUser: !!data?.user,
                hasSession: !!data?.session,
                identities: data?.user?.identities,
            });

            // Si el correo ya está registrado en Supabase
            if (data?.user && data.user.identities && data.user.identities.length === 0) {
                Alert.alert('Aviso', 'Este correo electrónico ya se encuentra registrado. Intenta iniciar sesión.');
                return;
            }

            // Caso 1: Inicio de sesión inmediato (Confirm email desactivado en Supabase)
            if (data?.session) {
                Alert.alert(
                    '¡Bienvenido!',
                    'Tu cuenta ha sido creada exitosamente.',
                    [
                        {
                            text: 'Comenzar',
                            onPress: () => navigation.navigate('Home', { userId: data.user?.id }),
                        },
                    ]
                );
                return;
            }

            // Caso 2: Supabase tiene "Confirm email" activado (data.session es null hasta confirmar)
            if (data?.user) {
                Alert.alert(
                    '¡Cuenta creada!',
                    'Te hemos enviado un correo de confirmación. Revisa tu bandeja de entrada para verificar tu cuenta e iniciar sesión.\n\n(Tip: Puedes desactivar "Confirm email" en el panel de Supabase para entrar directamente).',
                    [
                        {
                            text: 'Ir a Iniciar Sesión',
                            onPress: () => navigation.navigate('Login'),
                        },
                    ]
                );
            }
        } catch (err: any) {
            Alert.alert('Error', 'Ocurrió un error inesperado al procesar tu solicitud.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Barra Superior con botón atrás y logo */}
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backButtonText}>←</Text>
                        </TouchableOpacity>

                        <View style={styles.brandBadge}>
                            <Text style={styles.brandBadgeText}>HSPORT</Text>
                        </View>
                    </View>

                    {/* Encabezado */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.welcomeBadge}>Crea tu cuenta</Text>
                        <Text style={styles.title}>Comienza ahora</Text>
                        <Text style={styles.subtitle}>
                            Accede a tu carrito, guarda tus favoritos y recibe notificaciones exclusivas.
                        </Text>
                    </View>

                    {/* Formulario */}
                    <View style={styles.form}>
                        {/* Nombre Completo */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre Completo</Text>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    focusedField === 'name' && styles.inputWrapperFocused,
                                ]}
                            >
                                <Text style={styles.inputIcon}></Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ej. Carlos Mendoza"
                                    placeholderTextColor="#94A3B8"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        {/* Correo Electrónico */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Correo Electrónico</Text>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    focusedField === 'email' && styles.inputWrapperFocused,
                                ]}
                            >
                                <Text style={styles.inputIcon}></Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="tu@email.com"
                                    placeholderTextColor="#94A3B8"
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        {/* Contraseña */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña</Text>
                            <View
                                style={[
                                    styles.inputWrapper,
                                    focusedField === 'password' && styles.inputWrapperFocused,
                                ]}
                            >
                                <Text style={styles.inputIcon}></Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mínimo 6 caracteres"
                                    placeholderTextColor="#94A3B8"
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setShowPassword(!showPassword)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/* Botón de Registro */}
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={Register}
                            disabled={loading}
                            activeOpacity={0.85}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Text style={styles.buttonText}>Crear Cuenta</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Footer / Enlace a Login */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta?</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.footerLink}>Inicia Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );



}
