import {
    Text,
    TextInput,
    View,
} from 'react-native';

import { colors } from '@/theme';

import { InputProps } from './types';

import { style } from './style';

export default function Input({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
}: InputProps) {

    return (
        <View style={style.container}>

            {label && (
                <Text style={style.label}>
                    {label}
                </Text>
            )}

            <TextInput
                style={style.input}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize="none"
            />

        </View>
    );
}