import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 36,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    brandContainer: {
        alignItems: 'center',
        marginBottom: 36,
    },

    logoIcon: {
        width: 200,
        height: 200,
    },
    brandTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -1,
        marginBottom: 8,
    },
    brandHighlight: {
        color: '#2563EB',
    },
    brandSubtitle: {
        fontSize: 15,
        color: '#64748B',
        textAlign: 'center',
        maxWidth: 280,
    },
    form: {
        gap: 18,
    },
    inputGroup: {
        gap: 6,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#334155',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        paddingHorizontal: 14,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.03,
                shadowRadius: 3,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    inputWrapperFocused: {
        borderColor: '#2563EB',
        borderWidth: 1.5,
        backgroundColor: '#FFFFFF',
    },
    inputIcon: {
        fontSize: 16,
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 15,
        color: '#0F172A',
    },
    eyeButton: {
        padding: 6,
    },
    eyeIcon: {
        fontSize: 16,
    },
    forgotPasswordWrapper: {
        alignSelf: 'flex-end',
        marginTop: 2,
    },
    forgotPasswordText: {
        fontSize: 13,
        color: '#2563EB',
        fontWeight: '600',
    },
    button: {
        height: 52,
        backgroundColor: '#2563EB',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    buttonDisabled: {
        backgroundColor: '#94A3B8',
        elevation: 0,
        shadowOpacity: 0,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        gap: 6,
    },
    footerText: {
        fontSize: 14,
        color: '#64748B',
    },
    footerLink: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2563EB',
    },
});