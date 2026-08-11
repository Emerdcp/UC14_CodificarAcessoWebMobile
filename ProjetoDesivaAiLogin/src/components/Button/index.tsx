import {
    Text,
    TouchableOpacity,
} from 'react-native';

import { ButtonProps } from './types';

import { style } from './style';

export default function Button({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
}: ButtonProps) {

    const textStyle =
        variant === 'google'
            ? style.googleText
            : style.text;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled}
            style={[
                style.button,
                style[variant],
                disabled && style.disabled,
            ]}
        >
            <Text style={textStyle}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}