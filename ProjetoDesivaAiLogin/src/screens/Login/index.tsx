import { useState } from 'react';

import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Logo from '@/components/Logo';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { loginComGoogle } from "@/services/googleAuth";

import { RootStackParamList } from '@/navigation/AppRoutes';

import { style } from './style';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'Login'
>;

export default function Login({ navigation }: Props) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // const handleGoogleLogin = async () => {
    //     try {
    //         const response = await loginComGoogle();

    //         console.log("Login realizado:", response);

    //     } catch (error) {
    //         console.error("Falha no login:", error);
    //     }
    // };

    const handleGoogleLogin = async () => {
        try {
            const response = await loginComGoogle();

            console.log("Login realizado:", response);

            Alert.alert(
                "Login realizado",
                "Autenticação com Google realizada com sucesso."
            );

        } catch (error) {

            console.error("Falha no login:", error);

            Alert.alert(
                "Erro",
                "Não foi possível realizar o login com Google."
            );
        }
    };

    function handleLogin() {

        if (
            email === 'admin@email.com' &&
            senha === '123456'
        ) {

            navigation.replace('Home');

            return;
        }

        Alert.alert(
            'Atenção',
            'E-mail ou senha inválidos.'
        );
    }

    return (

        <KeyboardAvoidingView
            style={style.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >

            <ScrollView
                contentContainerStyle={style.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                <View style={style.header}>

                    <Logo size={150} />

                    <Text style={style.title}>
                        Bem-vindo!
                    </Text>

                    <Text style={style.subtitle}>
                        Entre para continuar
                    </Text>

                </View>

                <View style={style.form}>

                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />

                    <Button
                        title="Entrar"
                        onPress={handleLogin}
                    />

                    <View style={style.dividerContainer}>

                        <View style={style.divider} />

                        <Text style={style.dividerText}>
                            ou
                        </Text>

                        <View style={style.divider} />

                    </View>

                    <TouchableOpacity
                        onPress={handleGoogleLogin}
                    >
                        <Text>Entrar com Google</Text>
                    </TouchableOpacity>

                    {/* <Button
                        title="Continuar com Google"
                        variant="google"
                        onPress={() => { }}
                        disabled
                    />

                    <Text style={style.googleInfo}>
                        Login com Google estará disponível em breve.
                    </Text> */}

                </View>

                <Text style={style.version}>
                    Versão 1.0.0
                </Text>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}