import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';

// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Callout
} from 'react-native-maps';
import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppRoutes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { removerSessao } from '@/services/session';
import { Ionicons } from '@expo/vector-icons';
import { style } from './style';
// import { listarOcorrencias } from '@/database/ocorrenciaRepository';
import {
    listarOcorrencias,
    type Ocorrencia
} from '@/database/ocorrenciaRepository';


type Props = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;

export default function Home({ navigation }: Props) {

    const mapRef = useRef<MapView | null>(null);
    const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);

    useFocusEffect(
        useCallback(() => {

            async function carregarOcorrencias() {

                try {

                    const dados =
                        await listarOcorrencias();

                    console.log(
                        'OCORRÊNCIAS NO SQLITE:',
                        dados
                    );

                    setOcorrencias(dados);

                } catch (error) {

                    console.error(
                        'Erro ao carregar ocorrências:',
                        error
                    );

                }

            }

            carregarOcorrencias();

        }, [])
    );
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

            <View style={style.zoomControls}>

                <TouchableOpacity
                    style={style.zoomButton}
                    onPress={() => {
                        mapRef.current?.getCamera().then(camera => {
                            if (camera) {
                                mapRef.current?.animateCamera({
                                    ...camera,
                                    zoom: (camera.zoom ?? 15) + 1,
                                });
                            }
                        });
                    }}
                >
                    <Text style={style.zoomButtonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.zoomButton}
                    onPress={() => {
                        mapRef.current?.getCamera().then(camera => {
                            if (camera) {
                                mapRef.current?.animateCamera({
                                    ...camera,
                                    zoom: Math.max(
                                        (camera.zoom ?? 15) - 1,
                                        1
                                    ),
                                });
                            }
                        });
                    }}
                >
                    <Text style={style.zoomButtonText}>−</Text>
                </TouchableOpacity>

            </View>

            <View style={style.content}>

                {location && (

                    <MapView
                        ref={mapRef}
                        style={style.map}
                        provider={PROVIDER_GOOGLE}

                        showsUserLocation={true}
                        showsMyLocationButton={true}

                        zoomEnabled={true}
                        zoomControlEnabled={false}
                        scrollEnabled={true}
                        rotateEnabled={true}

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

                        {ocorrencias.map((ocorrencia) => (

                            <Marker
                                key={ocorrencia.id}

                                coordinate={{
                                    latitude: ocorrencia.latitude,
                                    longitude: ocorrencia.longitude
                                }}

                                pinColor={
                                    ocorrencia.status === 'RESOLVIDA'
                                        ? '#22C55E'
                                        : '#EF4444'
                                }

                                onPress={() =>
                                    navigation.navigate(
                                        'DetalhesOcorrencia',
                                        {
                                            ocorrenciaId: ocorrencia.id
                                        }
                                    )
                                }
                            >

                                <Callout
                                    onPress={() =>
                                        navigation.navigate(
                                            'DetalhesOcorrencia',
                                            {
                                                ocorrenciaId: ocorrencia.id
                                            }
                                        )
                                    }
                                >

                                    <View
                                        style={{
                                            width: 220,
                                            padding: 5
                                        }}
                                    >

                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '700',
                                                color:
                                                    ocorrencia.status === 'RESOLVIDA'
                                                        ? '#22C55E'
                                                        : '#EF4444',
                                                marginBottom: 5
                                            }}
                                        >
                                            {ocorrencia.status === 'RESOLVIDA'
                                                ? '🟢 Ocorrência resolvida'
                                                : '🔴 Ocorrência aberta'}
                                        </Text>


                                        <Text
                                            style={{
                                                fontSize: 14,
                                                color: '#555',
                                                marginBottom: 8
                                            }}
                                        >
                                            {ocorrencia.descricao
                                                ? ocorrencia.descricao.length > 15
                                                    ? ocorrencia.descricao.slice(0, 15) + '...'
                                                    : ocorrencia.descricao
                                                : 'Problema registrado na via.'}
                                        </Text>


                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: '#00263D',
                                                fontWeight: '700'
                                            }}
                                        >
                                            Toque para ver detalhes →
                                        </Text>

                                    </View>

                                </Callout>

                            </Marker>

                        ))}

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