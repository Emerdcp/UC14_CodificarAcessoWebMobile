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

import { NativeStackScreenProps, } from '@react-navigation/native-stack';
import Logo from '@/components/Logo';
import Input from '@/components/Input';
import Button from '@/components/Button';

import { loginComGoogle } from "@/services/googleAuth";
import { salvarSessao } from '@/services/session';

import { RootStackParamList } from '@/navigation/AppRoutes';
import { FontAwesome } from '@expo/vector-icons';
import { style } from './style';

import {
    buscarUsuarioPorGoogleId,
    cadastrarUsuario,
    atualizarUltimoLogin
} from '@/database/usuarioRepository';


type Props = NativeStackScreenProps<
    RootStackParamList,
    'Login'
>;

export default function Login({ navigation }: Props) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleGoogleLogin = async () => {

        try {

            const response = await loginComGoogle();

            if (
                response.type !== 'success' ||
                !response.data
            ) {
                throw new Error(
                    'Não foi possível obter os dados do Google.'
                );
            }

            const usuarioGoogle = response.data.user;

            console.log(
                "Usuário Google:",
                usuarioGoogle
            );

            const usuarioExistente =
                await buscarUsuarioPorGoogleId(
                    usuarioGoogle.id
                );

            if (!usuarioExistente) {

                await cadastrarUsuario({

                    google_id: usuarioGoogle.id,

                    nome:
                        usuarioGoogle.name ??
                        'Usuário Google',

                    email:
                        usuarioGoogle.email,

                    foto_url:
                        usuarioGoogle.photo ?? null

                });

            } else {

                await atualizarUltimoLogin(
                    usuarioGoogle.id
                );

            }

            /*
             * Salva os dados básicos do usuário
             * para manter a sessão do aplicativo.
             */
            await salvarSessao({

                google_id: usuarioGoogle.id,

                nome:
                    usuarioGoogle.name ??
                    'Usuário Google',

                email:
                    usuarioGoogle.email,

                foto_url:
                    usuarioGoogle.photo ?? null

            });

            navigation.replace('Home');



            navigation.replace('Home');

        } catch (error) {

            console.error(
                "Falha no login:",
                error
            );

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
                        style={style.googleButton}
                        onPress={handleGoogleLogin}
                        activeOpacity={0.8}
                    >
                        <FontAwesome
                            name="google"
                            size={22}
                            color="#4285F4"
                        />

                        <Text style={style.googleButtonText}>
                            Entrar com Google
                        </Text>
                    </TouchableOpacity>

                </View>

                <Text style={style.version}>
                    Versão 1.0.0
                </Text>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}