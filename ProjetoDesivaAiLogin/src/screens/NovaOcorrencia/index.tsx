import { useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    TextInput,
    ScrollView
} from 'react-native';

import * as Location from 'expo-location';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppRoutes';
import { style } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { cadastrarOcorrencia } from '@/database/ocorrenciaRepository';
import { obterSessao } from '@/services/session';


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

    const [descricao, setDescricao] =
        useState('');

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

    async function handleSalvar() {

        try {

            if (!localizacao) {

                Alert.alert(
                    'Atenção',
                    'Informe a localização da ocorrência.'
                );

                return;
            }

            if (!foto) {

                Alert.alert(
                    'Atenção',
                    'Adicione uma foto do problema.'
                );

                return;
            }

            if (!descricao.trim()) {

                Alert.alert(
                    'Atenção',
                    'Informe uma descrição do problema.'
                );

                return;
            }

            const sessao =
                await obterSessao();

            if (!sessao) {

                Alert.alert(
                    'Erro',
                    'Sua sessão não foi encontrada. Faça login novamente.'
                );

                navigation.replace('Login');

                return;
            }

            if (!sessao.id) {

                Alert.alert(
                    'Erro',
                    'Não foi possível identificar o usuário. Faça login novamente.'
                );

                navigation.replace('Login');

                return;
            }

            await cadastrarOcorrencia({

                usuario_id:
                    sessao.id,

                latitude:
                    localizacao.coords.latitude,

                longitude:
                    localizacao.coords.longitude,

                foto_uri:
                    foto,

                descricao:
                    descricao.trim()

            });

            Alert.alert(
                'Ocorrência registrada',
                'O problema foi registrado com sucesso.',
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.goBack()
                    }
                ]
            );

        } catch (error) {

            console.error(
                'Erro ao cadastrar ocorrência:',
                error
            );

            Alert.alert(
                'Erro',
                'Não foi possível registrar a ocorrência.'
            );
        }
    }

    return (

        <SafeAreaView
            style={style.container}
            edges={['top']}
        >

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

            <ScrollView
                style={style.content}
                contentContainerStyle={{
                    paddingBottom: 30
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >

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

                <View style={style.card}>

                    <Text style={style.cardTitle}>
                        📝 Descrição
                    </Text>

                    <Text style={style.cardDescription}>
                        Descreva o problema encontrado.
                    </Text>

                    <TextInput
                        style={style.descriptionInput}
                        placeholder="Ex: Buraco grande próximo ao ponto de ônibus..."
                        placeholderTextColor="#999"
                        value={descricao}
                        onChangeText={setDescricao}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />

                </View>

                <TouchableOpacity
                    style={style.saveButton}
                    onPress={handleSalvar}
                    activeOpacity={0.8}
                >
                    <Text style={style.saveButtonText}>
                        Registrar ocorrência
                    </Text>
                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView >
    );
}