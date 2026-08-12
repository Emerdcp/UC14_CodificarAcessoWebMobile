import { View, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppRoutes';
import { style } from './style';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;

export default function Home({ navigation }: Props) {

    async function handleLogout() {
        try {

            await GoogleSignin.signOut();

        } catch (error) {

            console.error('Erro ao sair do Google:', error);

        } finally {

            navigation.replace('Login');

        }
    }

    return (
        <View style={style.container}>

            <View style={style.header}>
                <Text style={style.headerTitle}>
                    DesviaAi
                </Text>
            </View>

            <View style={style.content}>

                <Text style={style.locationIcon}>
                    📍
                </Text>

                <Text style={style.mapPlaceholder}>
                    Mapa
                </Text>

            </View>

            <View style={style.footer}>

                <TouchableOpacity
                    style={style.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <Text style={style.logoutButtonText}>
                        Sair
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}