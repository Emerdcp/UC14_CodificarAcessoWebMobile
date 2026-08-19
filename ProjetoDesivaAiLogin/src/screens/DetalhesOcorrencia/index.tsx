import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppRoutes';
import { useEffect, useState } from 'react';

import {
    buscarOcorrenciaPorId,
    incrementarCurtidas,
    incrementarConfirmacoesResolvido,
    type Ocorrencia
} from '@/database/ocorrenciaRepository';

import { style } from './style';


type Props = NativeStackScreenProps<
    RootStackParamList,
    'DetalhesOcorrencia'
>;


export default function DetalhesOcorrencia({
    navigation,
    route
}: Props) {

    const [ocorrencia, setOcorrencia] =
        useState<Ocorrencia | null>(null);

    useEffect(() => {

        async function carregarOcorrencia() {

            try {

                const dados =
                    await buscarOcorrenciaPorId(
                        route.params.ocorrenciaId
                    );

                setOcorrencia(dados);

            } catch (error) {

                console.error(
                    'Erro ao carregar ocorrência:',
                    error
                );

            }

        }

        carregarOcorrencia();

    }, [route.params.ocorrenciaId]);


    if (!ocorrencia) {

        return (
            <SafeAreaView
                style={style.container}
                edges={['top']}
            >

                <Text style={style.loading}>
                    Carregando ocorrência...
                </Text>

            </SafeAreaView>
        );

    }


    const resolvida =
        ocorrencia.status === 'RESOLVIDA';

    const ocorrenciaId = ocorrencia.id;

    async function handleCurtir() {

        try {

            await incrementarCurtidas(
                ocorrenciaId
            );

            const atualizada =
                await buscarOcorrenciaPorId(
                    ocorrenciaId
                );

            setOcorrencia(atualizada);

            Alert.alert(
                'Obrigado!',
                'Sua curtida foi registrada.'
            );

        } catch (error) {

            console.error(
                'Erro ao curtir ocorrência:',
                error
            );

            Alert.alert(
                'Erro',
                'Não foi possível registrar sua curtida.'
            );

        }
    }

    async function handleConfirmarResolvido() {

        try {

            await incrementarConfirmacoesResolvido(
                ocorrenciaId
            );

            const atualizada =
                await buscarOcorrenciaPorId(
                    ocorrenciaId
                );

            setOcorrencia(atualizada);

        } catch (error) {

            console.error(
                'Erro ao confirmar ocorrência:',
                error
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
                    style={style.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#00263D"
                    />
                </TouchableOpacity>

                <Text style={style.title}>
                    Detalhes da ocorrência
                </Text>

            </View>


            <ScrollView
                contentContainerStyle={
                    style.content
                }
                showsVerticalScrollIndicator={false}
            >

                {ocorrencia.foto_uri && (

                    <Image
                        source={{
                            uri: ocorrencia.foto_uri
                        }}
                        style={style.photo}
                    />

                )}


                <View style={style.card}>

                    <Text style={style.cardTitle}>
                        {resolvida
                            ? '🟢 Ocorrência resolvida'
                            : '🔴 Ocorrência aberta'}
                    </Text>


                    <Text style={style.description}>
                        {ocorrencia.descricao ??
                            'Problema registrado na via.'}
                    </Text>

                </View>


                <View style={style.card}>

                    <Text style={style.sectionTitle}>
                        📍 Localização
                    </Text>


                    <Text style={style.info}>
                        Latitude:{' '}
                        {ocorrencia.latitude.toFixed(6)}
                    </Text>


                    <Text style={style.info}>
                        Longitude:{' '}
                        {ocorrencia.longitude.toFixed(6)}
                    </Text>

                </View>


                <View style={style.card}>

                    <Text style={style.sectionTitle}>
                        📊 Informações
                    </Text>


                    <Text style={style.info}>
                        👍 Curtidas: {ocorrencia.curtidas}
                    </Text>


                    <Text style={style.info}>
                        ✓ Confirmações:
                        {' '}
                        {ocorrencia.confirmacoes_resolvido}
                    </Text>


                    <Text style={style.info}>
                        Status: {ocorrencia.status}
                    </Text>

                </View>


                {!resolvida && (

                    <View style={style.actions}>

                        <TouchableOpacity
                            style={style.likeButton}
                            onPress={handleCurtir}
                            activeOpacity={0.8}
                        >

                            <Text style={style.buttonText}>
                                👍 Curtir ocorrência
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={style.resolveButton}
                            onPress={handleConfirmarResolvido}
                            activeOpacity={0.8}
                        >

                            <Text style={style.buttonText}>
                                ✓ Confirmar problema resolvido
                            </Text>

                        </TouchableOpacity>

                    </View>

                )}

            </ScrollView>

        </SafeAreaView>
    );
}