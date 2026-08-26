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

    content: {
        flexGrow: 1,

        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xl,

        justifyContent: 'center',
    },

    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },

    title: {
        marginTop: spacing.md,

        fontSize: typography.h2,
        fontWeight: '700',

        color: colors.text,
    },

    subtitle: {
        marginTop: spacing.xs,

        fontSize: typography.body,

        color: colors.textSecondary,
    },

    form: {
        width: '100%',
    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: spacing.sm,
    },

    divider: {
        flex: 1,
        height: 1,

        backgroundColor: colors.border,
    },

    dividerText: {
        marginHorizontal: spacing.md,

        fontSize: 14,
        color: colors.textSecondary,
    },

    googleInfo: {
        textAlign: 'center',

        marginTop: -spacing.sm,
        marginBottom: spacing.md,

        fontSize: 11,
        color: colors.textSecondary,
    },

    version: {
        textAlign: 'center',

        marginTop: spacing.lg,

        fontSize: 12,
        color: colors.textSecondary,
    },
    googleButton: {
        height: 52,

        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        borderColor: '#DADCE0',

        borderRadius: 10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        gap: 12,

        marginTop: 4,
    },

    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',

        color: '#202124',
    },

});

export { style };