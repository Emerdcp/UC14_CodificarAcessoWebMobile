import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '@/theme';

const style = StyleSheet.create({

    button: {
        width: '100%',
        height: 52,
        borderRadius: radius.md,

        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: spacing.md,
    },

    primary: {
        backgroundColor: colors.primary,
    },

    secondary: {
        backgroundColor: colors.secondary,
    },

    danger: {
        backgroundColor: colors.danger,
    },

    success: {
        backgroundColor: colors.success,
    },

    google: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.border,
    },

    text: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
    },

    googleText: {
        color: colors.text,
    },

    disabled: {
        opacity: 0.5,
    },

});

export { style };