import { StyleSheet } from 'react-native';

import {
    colors,
    spacing,
    typography,
} from '@/theme';

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        height: 94,

        backgroundColor: colors.secondary,

        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: spacing.lg,
        paddingTop: 25,
    },

    headerTitle: {
        fontSize: typography.title,
        fontWeight: '700',

        color: colors.white,
        transform: [
            { translateY: 15 }
        ],
    },

    mapContainer: {
        flex: 1,

        overflow: 'hidden',
    },

    map: {
        flex: 1,
    },

    footer: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.lg,

        backgroundColor: colors.background,
    },

    content: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',

        paddingHorizontal: 20,
    },

    locationIcon: {
        fontSize: 50,

        marginBottom: 10,
    },

    mapPlaceholder: {
        fontSize: 20,
        fontWeight: '600',

        color: '#64748B',
    },
  

    logoutButton: {
        height: 50,

        backgroundColor: '#071B33',

        borderRadius: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },

    logoutButtonText: {
        color: '#FFFFFF',

        fontSize: 16,
        fontWeight: '700',
    },
    

});

export { style };