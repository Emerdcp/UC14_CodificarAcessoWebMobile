import { useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';

import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppRoutes';
import { style } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'NovaOcorrencia'
>;

export default function NovaOcorrencia({
    navigation
}: Props) {

    const [localizacao, setLocalizacao] =
        useState<Location.LocationObject | null>(null);

    const [carregandoLocalizacao, setCarregandoLocalizacao] =
        useState(false);

    const [foto, setFoto] =
        useState<string | null>(null);

    async function obterLocalizacao() {

        try {

            setCarregandoLocalizacao(true);

            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {

                Alert.alert(
                    'Permissão necessária',
                    'Precisamos da sua localização para registrar a ocorrência.'
                );

                return;
            }

            const local =
                await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High
                });

            setLocalizacao(local);

            Alert.alert(
                'Localização obtida',
                'Sua localização foi registrada com sucesso.'
            );

        } catch (error) {

            console.error(
                'Erro ao obter localização:',
                error
            );

            Alert.alert(
                'Erro',
                'Não foi possível obter sua localização.'
            );

        } finally {

            setCarregandoLocalizacao(false);

        }
    }

    async function tirarFoto() {

        try {

            const permissao =
                await ImagePicker.requestCameraPermissionsAsync();

            if (permissao.status !== 'granted') {

                Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso à câmera para tirar a foto.'
                );

                return;
            }

            const resultado =
                await ImagePicker.launchCameraAsync({

                    mediaTypes: ['images'],

                    allowsEditing: true,

                    aspect: [4, 3],

                    quality: 0.8,
                });

            if (!resultado.canceled) {

                setFoto(
                    resultado.assets[0].uri
                );

            }

        } catch (error) {

            console.error(
                'Erro ao tirar foto:',
                error
            );

            Alert.alert(
                'Erro',
                'Não foi possível acessar a câmera.'
            );
        }
    }

    async function escolherFoto() {

        try {

            const permissao =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissao.status !== 'granted') {

                Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso às suas fotos.'
                );

                return;
            }

            const resultado =
                await ImagePicker.launchImageLibraryAsync({

                    mediaTypes: ['images'],

                    allowsEditing: true,

                    aspect: [4, 3],

                    quality: 0.8,
                });

            if (!resultado.canceled) {

                setFoto(
                    resultado.assets[0].uri
                );

            }

        } catch (error) {

            console.error(
                'Erro ao escolher foto:',
                error
            );

            Alert.alert(
                'Erro',
                'Não foi possível acessar a galeria.'
            );
        }
    }

    return (

        <SafeAreaView style={style.container} edges={['top']}>

            <View style={style.header}>

                <TouchableOpacity
                    onPress={() =>
                        navigation.goBack()
                    }
                >
                    <Text style={style.back}>
                        ‹
                    </Text>
                </TouchableOpacity>

                <Text style={style.title}>
                    Nova ocorrência
                </Text>

            </View>

            <View style={style.content}>

                <Text style={style.subtitle}>
                    Registre um problema encontrado na via
                </Text>

                <View style={style.card}>

                    <Text style={style.cardTitle}>
                        📍 Localização
                    </Text>

                    <Text style={style.cardDescription}>
                        Informe onde o problema foi encontrado.
                    </Text>

                    <TouchableOpacity
                        style={style.locationButton}
                        onPress={obterLocalizacao}
                        disabled={carregandoLocalizacao}
                    >

                        <Text style={style.locationButtonText}>

                            {carregandoLocalizacao
                                ? 'Obtendo localização...'
                                : 'Usar minha localização'}

                        </Text>

                    </TouchableOpacity>

                    {localizacao && (

                        <Text style={style.coordinates}>

                            Latitude:{' '}
                            {localizacao.coords.latitude.toFixed(6)}

                            {'\n'}

                            Longitude:{' '}
                            {localizacao.coords.longitude.toFixed(6)}

                        </Text>

                    )}

                </View>

                <View style={style.card}>

                    <Text style={style.cardTitle}>
                        📷 Foto do problema
                    </Text>

                    <Text style={style.cardDescription}>
                        Tire uma foto ou escolha uma imagem da galeria.
                    </Text>

                    <View style={style.photoButtons}>

                        <TouchableOpacity
                            style={style.photoButton}
                            onPress={tirarFoto}
                            activeOpacity={0.8}
                        >
                            <Text style={style.photoButtonText}>
                                📷 Tirar foto
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={style.photoButton}
                            onPress={escolherFoto}
                            activeOpacity={0.8}
                        >
                            <Text style={style.photoButtonText}>
                                🖼️ Galeria
                            </Text>
                        </TouchableOpacity>

                    </View>

                    {foto && (

                        <View style={style.photoPreviewContainer}>

                            <Image
                                source={{ uri: foto }}
                                style={style.photoPreview}
                            />

                            <TouchableOpacity
                                style={style.removePhotoButton}
                                onPress={() => setFoto(null)}
                            >
                                <Text style={style.removePhotoText}>
                                    Remover foto
                                </Text>
                            </TouchableOpacity>

                        </View>

                    )}

                </View>

            </View>

        </SafeAreaView>
    );
}