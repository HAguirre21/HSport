import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },

    // Header Minimalista
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerBackBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    headerBackText: {
        fontSize: 18,
        color: '#0F172A',
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0F172A',
    },
    headerClearBtn: {
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    headerClearText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#EF4444',
    },

    // Contenido
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 32,
    },
    itemsContainer: {
        gap: 12,
    },

    // Tarjeta de Producto
    cartCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        alignItems: 'center',
    },
    cartCardImage: {
        width: 72,
        height: 72,
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
    },
    cartCardInfo: {
        flex: 1,
        marginLeft: 14,
        justifyContent: 'center',
    },
    cartCardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    cartCardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
        flex: 1,
        marginRight: 8,
    },
    deleteBtn: {
        padding: 4,
    },
    deleteBtnText: {
        fontSize: 13,
        color: '#94A3B8',
        fontWeight: '600',
    },
    cartCardBottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    cartCardPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },

    // Stepper (+ / -)
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 2,
    },
    stepperBtn: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepperBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
        lineHeight: 16,
    },
    stepperValue: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
        paddingHorizontal: 10,
    },

    // Estado vacío
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyStateIcon: {
        fontSize: 48,
        marginBottom: 12,
    },
    emptyStateTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6,
    },
    emptyStateSubtitle: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 20,
    },
    emptyStateBtn: {
        backgroundColor: '#0F172A',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    emptyStateBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },

    // Footer de Pago Minimalista
    checkoutFooter: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    totalLabel: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    totalValue: {
        fontSize: 19,
        fontWeight: '800',
        color: '#0F172A',
    },
    checkoutBtn: {
        backgroundColor: '#0F172A',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
});
