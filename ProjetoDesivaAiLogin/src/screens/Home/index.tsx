import { useEffect, useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';

import MapView, {
    Marker,
    PROVIDER_GOOGLE
} from 'react-native-maps';

import * as Location from 'expo-location';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation/AppRoutes';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { removerSessao } from '@/services/session';

import { Ionicons } from '@expo/vector-icons';

import { style } from './style';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;

export default function Home({ navigation }: Props) {

    const [location, setLocation] =
        useState<Location.LocationObject | null>(null);

    useEffect(() => {

        async function obterLocalizacao() {

            try {

                const { status } =
                    await Location.requestForegroundPermissionsAsync();

                if (status !== 'granted') {

                    Alert.alert(
                        'Permissão necessária',
                        'Precisamos da sua localização para mostrar sua posição no mapa.'
                    );

                    return;
                }

                const localizacao =
                    await Location.getCurrentPositionAsync({
                        accuracy:
                            Location.Accuracy.High
                    });

                setLocation(localizacao);

            } catch (error) {

                console.error(
                    'Erro ao obter localização:',
                    error
                );

                Alert.alert(
                    'Erro',
                    'Não foi possível obter sua localização.'
                );
            }
        }

        obterLocalizacao();

    }, []);

    async function handleLogout() {

        try {

            await GoogleSignin.signOut();

            await removerSessao();

            console.log(
                'Sessão encerrada com sucesso.'
            );

            navigation.replace('Login');

        } catch (error) {

            console.error(
                'Erro ao sair:',
                error
            );

            await removerSessao();

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

                {location && (

                    <MapView
                        style={style.map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation
                        showsMyLocationButton
                        initialRegion={{
                            latitude:
                                location.coords.latitude,

                            longitude:
                                location.coords.longitude,

                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01
                        }}
                    >

                        <Marker
                            coordinate={{
                                latitude:
                                    location.coords.latitude,

                                longitude:
                                    location.coords.longitude
                            }}
                            title="Você está aqui"
                        />

                    </MapView>

                )}

                {!location && (

                    <Text style={style.loadingMap}>
                        Obtendo sua localização...
                    </Text>

                )}

            </View>

            <View style={style.footer}>

                <TouchableOpacity
                    style={style.addButton}
                    onPress={() => navigation.navigate('NovaOcorrencia')}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="add"
                        size={32}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

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