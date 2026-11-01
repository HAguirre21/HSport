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
        paddingTop: 12,
        paddingBottom: 40,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    backButtonText: {
        fontSize: 18,
        color: '#0F172A',
        fontWeight: 'bold',
    },
    brandBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#EEF2FF',
        borderRadius: 20,
    },
    brandBadgeText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#2563EB',
        letterSpacing: 0.5,
    },
    headerContainer: {
        marginBottom: 28,
    },
    welcomeBadge: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2563EB',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
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
    inputWrapperError: {
        borderColor: '#EF4444',
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
    errorText: {
        fontSize: 11,
        color: '#EF4444',
        marginTop: 2,
        marginLeft: 2,
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
        marginTop: 24,
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
