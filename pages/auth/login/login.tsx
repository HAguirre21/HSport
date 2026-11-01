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
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../../../utils/supabase';
import { styles } from '../../../styles/login';
import { User } from '../../../interfaces/users';

export default function LoginScreen() {
    const nav = useNavigation<any>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);



    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Alert.alert(
                'Recuperar Contraseña',
                'Ingresa tu correo electrónico en el campo superior y presiona nuevamente esta opción.'
            );
            return;
        }

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase());
            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert(
                    'Correo Enviado',
                    'Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada.'
                );
            }
        } catch (err: any) {
            Alert.alert('Error', 'No se pudo enviar el correo de recuperación.');
        }
    };

    async function Login() {
        if (!email.trim() || !password) {
            Alert.alert('Campos incompletos', 'Por favor ingresa tu correo y contraseña.');
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            if (error || !data?.user) {
                const message =
                    error?.message === 'Invalid login credentials'
                        ? 'Correo o contraseña incorrectos. Por favor intenta de nuevo.'
                        : error?.message || 'No fue posible iniciar sesión.';
                Alert.alert('Error de autenticación', message);
                return;
            }

            const currentUserId = data.user.id;
            const profileType = data.user.user_metadata?.profile_type;

            if (profileType === 'admin') {
                nav.navigate('Admin');
            } else {
                nav.navigate('Home', { userId: currentUserId });
            }
        } catch (err: any) {
            console.error('Error al iniciar sesión:', err);
            Alert.alert('Error', 'Ocurrió un error inesperado al iniciar sesión.');
        } finally {
            setLoading(false);
        }
    };

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
                    {/* Logotipo y Título de Marca */}
                    <View style={styles.brandContainer}>
                        <Image
                            source={require('../../../assest/logo.png')}
                            style={styles.logoIcon}
                        />
                    </View>

                    {/* Formulario */}
                    <View style={styles.form}>
                        {/* Campo Correo Electrónico */}
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

                        {/* Campo Contraseña */}
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
                                    placeholder="Ingresa tu contraseña"
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

                            {/* Enlace Olvidé mi Contraseña */}
                            <TouchableOpacity
                                style={styles.forgotPasswordWrapper}
                                onPress={handleForgotPassword}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Botón Iniciar Sesión */}
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={Login}
                            disabled={loading}
                            activeOpacity={0.85}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Text style={styles.buttonText}>Iniciar Sesión</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Footer / Enlace a Registro */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Aún no tienes cuenta?</Text>
                        <TouchableOpacity
                            onPress={() => nav.navigate('Register')}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.footerLink}>Regístrate aquí</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
