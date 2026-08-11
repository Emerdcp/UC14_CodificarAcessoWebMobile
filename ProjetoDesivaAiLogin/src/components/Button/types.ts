export type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'google';

export interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
}