import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
    },
    headerUser: {
        flex: 1,
    },
    greetingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    greetingText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    brandTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
        letterSpacing: -0.6,
    },
    brandHighlight: {
        color: '#2563EB',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    iconButton: {
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
    iconButtonText: {
        fontSize: 18,
    },
    userAvatarBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#EEF2FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#2563EB',
    },
    userAvatarText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#2563EB',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#EF4444',
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '800',
    },

    // Buscador Moderno
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginTop: 4,
        marginBottom: 14,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
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
    searchIcon: {
        marginRight: 10,
        fontSize: 16,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: '#0F172A',
    },
    clearSearch: {
        padding: 6,
    },
    clearSearchText: {
        fontSize: 14,
        color: '#94A3B8',
        fontWeight: 'bold',
    },

    // Banner Promocional
    bannerCard: {
        marginHorizontal: 20,
        marginBottom: 18,
        borderRadius: 20,
        backgroundColor: '#0F172A',
        padding: 20,
        overflow: 'hidden',
        position: 'relative',
        ...Platform.select({
            ios: {
                shadowColor: '#0F172A',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.2,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    bannerBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#2563EB',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: 8,
    },
    bannerBadgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '900',
        lineHeight: 28,
        marginBottom: 4,
    },
    bannerSubtitle: {
        color: '#94A3B8',
        fontSize: 13,
        marginBottom: 14,
        maxWidth: '85%',
    },
    bannerButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },
    bannerButtonText: {
        color: '#0F172A',
        fontSize: 13,
        fontWeight: '800',
    },

    // Categorías Horizontales
    categoriesList: {
        paddingHorizontal: 20,
        marginBottom: 18,
        gap: 8,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginRight: 8,
    },
    categoryPillActive: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
        ...Platform.select({
            ios: {
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    categoryIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748B',
    },
    categoryTextActive: {
        color: '#FFFFFF',
        fontWeight: '700',
    },

    // Encabezado de Sección
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    sectionAction: {
        fontSize: 13,
        fontWeight: '600',
        color: '#2563EB',
    },

    // Grilla de Productos
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    productCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 10,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        position: 'relative',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 5,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    tagBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: '#EF4444',
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
        zIndex: 2,
    },
    tagBadgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    favButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    favButtonText: {
        fontSize: 15,
    },
    productImage: {
        width: '100%',
        height: 130,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
        marginBottom: 8,
    },
    productCategory: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    productName: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6,
        height: 34,
        lineHeight: 17,
    },
    productRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    productRatingText: {
        fontSize: 11,
        color: '#64748B',
        fontWeight: '600',
        marginLeft: 3,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    priceContainer: {
        flexDirection: 'column',
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '900',
        color: '#0F172A',
    },
    productOldPrice: {
        fontSize: 11,
        color: '#94A3B8',
        textDecorationLine: 'line-through',
    },
    addCartButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#2563EB',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    addCartButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 20,
    },

    // Estado Vacío o Error
    emptyState: {
        width: '100%',
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyStateText: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 10,
        textAlign: 'center',
        maxWidth: 240,
    },

    // ==========================================
    // MODAL DE DETALLE MEJORADO Y ELEGANTE
    // ==========================================
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: Platform.OS === 'ios' ? 40 : 28,
        maxHeight: '88%',
    },
    modalHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    modalCategoryBadge: {
        backgroundColor: '#EEF2FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    modalCategoryBadgeText: {
        color: '#2563EB',
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    modalCloseIconBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseIconText: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: 'bold',
    },
    modalImage: {
        width: '100%',
        height: 220,
        borderRadius: 18,
        backgroundColor: '#F8FAFC',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 8,
        lineHeight: 26,
    },
    modalPriceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 12,
    },
    modelTextPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: '#0F172A',
    },
    modalStockRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 14,
    },
    modalStockIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
    },
    modalStockText: {
        fontSize: 13,
        color: '#10B981',
        fontWeight: '600',
    },
    modalDesc: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
        marginBottom: 20,
    },
    modalButtonsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 6,
    },
    modalAddToCartBtn: {
        flex: 1,
        height: 52,
        borderRadius: 14,
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#2563EB',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    modalAddToCartBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    modalCloseButton: {
        height: 52,
        paddingHorizontal: 20,
        borderRadius: 14,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#64748B',
        fontSize: 14,
        fontWeight: '700',
    },
});
