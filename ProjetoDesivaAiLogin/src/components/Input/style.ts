import { StyleSheet } from 'react-native';

import {
    colors,
    radius,
    spacing,
} from '@/theme';

const style = StyleSheet.create({

    container: {
        width: '100%',
        marginBottom: spacing.md,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,

        marginBottom: spacing.xs,
    },

    input: {
        width: '100%',
        height: 52,

        backgroundColor: colors.surface,

        borderWidth: 1,
        borderColor: colors.border,

        borderRadius: radius.md,

        paddingHorizontal: spacing.md,

        fontSize: 16,
        color: colors.text,
    },

});

export { style };