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

});

export { style };