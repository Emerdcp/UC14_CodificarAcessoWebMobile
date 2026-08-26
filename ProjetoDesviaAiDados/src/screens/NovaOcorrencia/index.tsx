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
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { cadastrarOcorrencia } from '@/database/ocorrenciaRepository';
import { obterSessao } from '@/services/session';
import { style } from './style';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'NovaOcorrencia'
>;

export default function NovaOcorrencia({
    navigation
}: Props) {
    const [localizacao, setLocalizacao] = useState<Location.LocationObject | null>(null);
    const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);
    const [foto, setFoto] = useState<string | null>(null);
    const [descricao, setDescricao] = useState('');
    const [modoLocalizacao, setModoLocalizacao] = useState<'GPS' | 'ENDERECO'>('GPS');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    /*
     * =========================================================
     * OBTER LOCALIZAÇÃO DO GPS
     * =========================================================
     */

    async function obterLocalizacao() {

        try {

            setCarregandoLocalizacao(true);


            const {
                status
            } =
                await Location.requestForegroundPermissionsAsync();


            if (
                status !== 'granted'
            ) {

                Alert.alert(
                    'Permissão necessária',
                    'Precisamos da sua localização para registrar a ocorrência.'
                );

                return;
            }


            const local =
                await Location.getCurrentPositionAsync({

                    accuracy:
                        Location.Accuracy.High

                });


            setLocalizacao(local);


            /*
             * Busca o endereço correspondente
             * às coordenadas do GPS.
             */

            const enderecoObtido =
                await Location.reverseGeocodeAsync({

                    latitude:
                        local.coords.latitude,

                    longitude:
                        local.coords.longitude

                });


            if (
                enderecoObtido.length > 0
            ) {

                const dados =
                    enderecoObtido[0];


                setCep(
                    dados.postalCode ?? ''
                );


                setEndereco(
                    dados.street ??
                    dados.name ??
                    ''
                );


                setNumero(
                    dados.streetNumber ??
                    ''
                );


                /*
                 * district = bairro
                 */

                setBairro(
                    dados.district ??
                    ''
                );


                /*
                 * Complemento continua
                 * sendo informado pelo usuário.
                 */

                setComplemento('');
            }


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

    /*
     * =========================================================
     * CONSULTAR CEP
     * =========================================================
     */
    async function buscarCep(cepDigitado: string) {

        const cepLimpo =
            cepDigitado.replace(/\D/g, '');

        /*
         * CEP precisa possuir exatamente
         * 8 números.
         */
        if (cepLimpo.length !== 8) {
            return;
        }

        try {

            console.log(
                'Consultando CEP:',
                cepLimpo
            );

            const resposta =
                await fetch(
                    `https://consultadecep.com/ws/${cepLimpo}/json/`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json'
                        }
                    }
                );

            console.log(
                'Status ConsultaCEP:',
                resposta.status
            );

            if (!resposta.ok) {

                throw new Error(
                    `HTTP ${resposta.status}`
                );

            }

            const dados =
                await resposta.json();

            console.log(
                'Resposta ConsultaCEP:',
                dados
            );

            /*
             * CEP válido, porém inexistente.
             */
            if (dados.erro) {

                Alert.alert(
                    'CEP não encontrado',
                    'Não encontramos um endereço para este CEP.'
                );

                return;
            }

            /*
             * CEP
             */
            setCep(
                dados.cep ?? cepDigitado
            );


            /*
             * Rua
             */
            setEndereco(
                dados.logradouro ?? ''
            );


            /*
             * Bairro
             */
            setBairro(
                dados.bairro ?? ''
            );

            /*
             * Número
             */
            setNumero('');


            console.log(
                'Endereço encontrado:',
                dados.logradouro
            );

            console.log(
                'Bairro encontrado:',
                dados.bairro
            );

            console.log(
                'Cidade:',
                dados.localidade
            );

            console.log(
                'UF:',
                dados.uf
            );

        } catch (error) {

            console.error(
                'Erro ao consultar CEP:',
                error
            );
        }
    }

    async function obterCoordenadasDoEndereco() {

        try {

            if (!endereco.trim()) {

                Alert.alert(
                    'Atenção',
                    'Informe o endereço da ocorrência.'
                );

                return null;
            }

            if (!numero.trim()) {

                Alert.alert(
                    'Atenção',
                    'Informe o número do endereço.'
                );

                return null;
            }

            /*
             * Monta o endereço completo
             * para realizar a geocodificação.
             */
            const enderecoCompleto =
                `${endereco}, ${numero}, ${bairro}, ${cep}, Brasil`;


            console.log(
                'Consultando endereço:',
                enderecoCompleto
            );


            const resultados =
                await Location.geocodeAsync(
                    enderecoCompleto
                );


            console.log(
                'Resultado da geocodificação:',
                resultados
            );

            if (resultados.length === 0) {

                Alert.alert(
                    'Endereço não encontrado',
                    'Não foi possível localizar esse endereço. Verifique os dados informados.'
                );

                return null;
            }


            const coordenadas =
                resultados[0];

            /*
             * Cria o objeto de localização.
             */
            const novaLocalizacao: Location.LocationObject = {

                coords: {

                    latitude:
                        coordenadas.latitude,

                    longitude:
                        coordenadas.longitude,

                    altitude:
                        null,

                    accuracy:
                        null,

                    altitudeAccuracy:
                        null,

                    heading:
                        null,

                    speed:
                        null

                },

                timestamp:
                    Date.now()

            };

            /*
             * Atualiza o estado para a tela.
             */
            setLocalizacao(
                novaLocalizacao
            );


            console.log(
                'Coordenadas encontradas:',
                coordenadas.latitude,
                coordenadas.longitude
            );

            /*
             * IMPORTANTE:
             *
             * Retornamos a localização imediatamente
             * para o handleSalvar().
             *
             * Assim não dependemos do setState.
             */
            return novaLocalizacao;


        } catch (error) {

            console.error(
                'Erro ao localizar endereço:',
                error
            );


            Alert.alert(
                'Erro',
                'Não foi possível localizar o endereço informado.'
            );


            return null;
        }
    }

    /*
     * =========================================================
     * TIRAR FOTO
     * =========================================================
     */

    async function tirarFoto() {

        try {

            const permissao =
                await ImagePicker
                    .requestCameraPermissionsAsync();


            if (
                permissao.status !== 'granted'
            ) {

                Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso à câmera para tirar a foto.'
                );

                return;
            }


            const resultado =
                await ImagePicker.launchCameraAsync({

                    mediaTypes:
                        ['images'],

                    allowsEditing:
                        true,

                    aspect:
                        [4, 3],

                    quality:
                        0.8

                });


            if (
                !resultado.canceled
            ) {

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

    /*
     * =========================================================
     * ESCOLHER FOTO
     * =========================================================
     */

    async function escolherFoto() {

        try {

            const permissao =
                await ImagePicker
                    .requestMediaLibraryPermissionsAsync();


            if (
                permissao.status !== 'granted'
            ) {

                Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso às suas fotos.'
                );

                return;
            }


            const resultado =
                await ImagePicker.launchImageLibraryAsync({

                    mediaTypes:
                        ['images'],

                    allowsEditing:
                        true,

                    aspect:
                        [4, 3],

                    quality:
                        0.8

                });


            if (
                !resultado.canceled
            ) {

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


    /*
     * =========================================================
     * SALVAR OCORRÊNCIA
     * =========================================================
     */

    async function handleSalvar() {

        try {
            /*
            * =========================================================
            * DETERMINAR LOCALIZAÇÃO FINAL
            * =========================================================
            */

            let localizacaoFinal:
                Location.LocationObject | null =
                null;

            /*
             * =========================================================
             * MODO GPS
             * =========================================================
             */

            if (
                modoLocalizacao === 'GPS'
            ) {

                /*
                 * No GPS a localização precisa
                 * ter sido obtida anteriormente.
                 */

                if (
                    !localizacao
                ) {

                    Alert.alert(
                        'Atenção',
                        'Use o botão "Usar minha localização" antes de registrar.'
                    );

                    return;
                }

                /*
                 * A localização do GPS será
                 * utilizada diretamente.
                 */

                localizacaoFinal =
                    localizacao;

            }

            /*
             * =========================================================
             * MODO ENDEREÇO
             * =========================================================
             */

            else {
                /*
                 * Converte o endereço informado
                 * em latitude e longitude.
                 */

                const enderecoLocalizado =
                    await obterCoordenadasDoEndereco();

                /*
                 * Não conseguiu localizar o endereço.
                 */

                if (
                    !enderecoLocalizado
                ) {

                    return;
                }

                /*
                 * IMPORTANTE:
                 *
                 * Usamos diretamente o resultado
                 * retornado pelo geocoding.
                 *
                 * Não dependemos do setState().
                 */

                localizacaoFinal =
                    enderecoLocalizado;
            }

            /*
             * =========================================================
             * GARANTIA DE LOCALIZAÇÃO
             * =========================================================
             */

            if (
                !localizacaoFinal
            ) {

                Alert.alert(
                    'Erro',
                    'Não foi possível determinar a localização da ocorrência.'
                );

                return;
            }

            /*
             * =========================================================
             * FOTO
             * =========================================================
             */

            if (
                !foto
            ) {

                Alert.alert(
                    'Atenção',
                    'Adicione uma foto do problema.'
                );

                return;
            }


            /*
             * DESCRIÇÃO
             */

            if (
                !descricao.trim()
            ) {

                Alert.alert(
                    'Atenção',
                    'Informe uma descrição do problema.'
                );

                return;
            }


            /*
             * SESSÃO
             */

            const sessao =
                await obterSessao();


            if (
                !sessao
            ) {

                Alert.alert(
                    'Erro',
                    'Sua sessão não foi encontrada. Faça login novamente.'
                );

                navigation.replace(
                    'Login'
                );

                return;
            }


            if (
                !sessao.id
            ) {

                Alert.alert(
                    'Erro',
                    'Não foi possível identificar o usuário. Faça login novamente.'
                );

                navigation.replace(
                    'Login'
                );

                return;
            }



            /*
             * CADASTRA NO SQLITE
             */

            await cadastrarOcorrencia({

                usuario_id:
                    sessao.id,

                latitude:
                    localizacaoFinal.coords.latitude,

                longitude:
                    localizacaoFinal.coords.longitude,

                cep:
                    cep.trim(),

                endereco:
                    endereco.trim(),

                numero:
                    numero.trim(),

                bairro:
                    bairro.trim(),

                complemento:
                    complemento.trim(),

                foto_uri:
                    foto,

                descricao:
                    descricao.trim()

            });


            /*
             * SUCESSO
             */

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


    /*
     * =========================================================
     * TELA
     * =========================================================
     */

    return (

        <SafeAreaView
            style={style.container}
            edges={['top']}
        >

            {/* ================================================= */}
            {/* CABEÇALHO */}
            {/* ================================================= */}

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


                {/* ================================================= */}
                {/* LOCALIZAÇÃO */}
                {/* ================================================= */}

                <View style={style.card}>

                    <Text style={style.cardTitle}>
                        📍 Localização
                    </Text>


                    <Text style={style.cardDescription}>
                        Informe onde o problema foi encontrado.
                    </Text>


                    {/* OPÇÕES */}

                    <View style={style.locationOptions}>


                        {/* GPS */}

                        <TouchableOpacity

                            style={[

                                style.locationOption,

                                modoLocalizacao === 'GPS' &&
                                style.locationOptionActive

                            ]}

                            onPress={async () => {

                                setModoLocalizacao(
                                    'GPS'
                                );

                                await obterLocalizacao();

                            }}

                            activeOpacity={0.8}

                        >

                            <Text

                                style={[

                                    style.locationOptionText,

                                    modoLocalizacao === 'GPS' &&
                                    style.locationOptionTextActive

                                ]}

                            >

                                {carregandoLocalizacao

                                    ? 'Obtendo localização...'

                                    : '📍 Usar minha localização'

                                }

                            </Text>

                        </TouchableOpacity>


                        {/* ENDEREÇO */}

                        <TouchableOpacity

                            style={[

                                style.locationOption,

                                modoLocalizacao === 'ENDERECO' &&
                                style.locationOptionActive

                            ]}

                            onPress={() => {

                                setModoLocalizacao(
                                    'ENDERECO'
                                );

                            }}

                            activeOpacity={0.8}

                        >

                            <Text

                                style={[

                                    style.locationOptionText,

                                    modoLocalizacao === 'ENDERECO' &&
                                    style.locationOptionTextActive

                                ]}

                            >

                                🏠 Informar endereço

                            </Text>

                        </TouchableOpacity>

                    </View>


                    {/* ================================================= */}
                    {/* COORDENADAS */}
                    {/* ================================================= */}

                    {localizacao && (

                        <Text style={style.coordinates}>

                            Latitude:{' '}

                            {localizacao.coords.latitude.toFixed(6)}

                            {'\n'}

                            Longitude:{' '}

                            {localizacao.coords.longitude.toFixed(6)}

                        </Text>

                    )}


                    {/* ================================================= */}
                    {/* ENDEREÇO ENCONTRADO */}
                    {/* ================================================= */}

                    {localizacao && endereco && (

                        <View style={style.addressResult}>

                            <Text
                                style={style.addressResultTitle}
                            >
                                📍 Endereço encontrado
                            </Text>


                            <Text
                                style={style.addressResultText}
                            >

                                {endereco}

                                {numero
                                    ? `, ${numero}`
                                    : ''
                                }

                            </Text>


                            {bairro && (

                                <Text
                                    style={style.addressResultText}
                                >
                                    {bairro}
                                </Text>

                            )}


                            {complemento && (

                                <Text
                                    style={style.addressResultText}
                                >
                                    {complemento}
                                </Text>

                            )}


                            {cep && (

                                <Text
                                    style={style.addressResultText}
                                >
                                    CEP: {cep}
                                </Text>

                            )}

                        </View>

                    )}


                    {/* ================================================= */}
                    {/* ENDEREÇO MANUAL */}
                    {/* ================================================= */}

                    {modoLocalizacao === 'ENDERECO' && (

                        <View style={style.manualAddress}>


                            {/* CEP */}

                            <Text style={style.inputLabel}>
                                CEP
                            </Text>


                            <TextInput

                                style={style.input}

                                placeholder="00000-000"

                                placeholderTextColor="#999"

                                value={cep}

                                keyboardType="numeric"

                                maxLength={9}

                                onChangeText={(texto) => {

                                    const somenteNumeros =
                                        texto.replace(
                                            /\D/g,
                                            ''
                                        );


                                    const cepFormatado =

                                        somenteNumeros.length > 5

                                            ? `${somenteNumeros.slice(0, 5)}-${somenteNumeros.slice(5, 8)}`

                                            : somenteNumeros;


                                    setCep(
                                        cepFormatado
                                    );


                                    if (
                                        somenteNumeros.length === 8
                                    ) {

                                        buscarCep(
                                            cepFormatado
                                        );

                                    }

                                }}

                            />


                            {/* ENDEREÇO */}

                            <Text style={style.inputLabel}>
                                Endereço
                            </Text>


                            <TextInput

                                style={style.input}

                                placeholder="Ex: Rua das Flores"

                                placeholderTextColor="#999"

                                value={endereco}

                                onChangeText={
                                    setEndereco
                                }

                            />


                            {/* NÚMERO */}

                            <Text style={style.inputLabel}>
                                Número
                            </Text>


                            <TextInput

                                style={style.input}

                                placeholder="Ex: 123"

                                placeholderTextColor="#999"

                                value={numero}

                                onChangeText={
                                    setNumero
                                }

                            />


                            {/* BAIRRO */}

                            <Text style={style.inputLabel}>
                                Bairro
                            </Text>


                            <TextInput

                                style={style.input}

                                placeholder="Ex: Jardim Recanto"

                                placeholderTextColor="#999"

                                value={bairro}

                                onChangeText={
                                    setBairro
                                }

                            />


                            {/* COMPLEMENTO */}

                            <Text style={style.inputLabel}>
                                Complemento
                            </Text>


                            <TextInput

                                style={style.input}

                                placeholder="Ex: Em frente à escola"

                                placeholderTextColor="#999"

                                value={complemento}

                                onChangeText={
                                    setComplemento
                                }

                            />

                        </View>

                    )}

                </View>


                {/* ================================================= */}
                {/* FOTO */}
                {/* ================================================= */}

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

                        <View
                            style={style.photoPreviewContainer}
                        >

                            <Image

                                source={{
                                    uri: foto
                                }}

                                style={style.photoPreview}

                            />


                            <TouchableOpacity

                                style={style.removePhotoButton}

                                onPress={() =>
                                    setFoto(null)
                                }

                            >

                                <Text
                                    style={style.removePhotoText}
                                >
                                    Remover foto
                                </Text>

                            </TouchableOpacity>

                        </View>

                    )}

                </View>


                {/* ================================================= */}
                {/* DESCRIÇÃO */}
                {/* ================================================= */}

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

                        onChangeText={
                            setDescricao
                        }

                        multiline

                        numberOfLines={4}

                        textAlignVertical="top"

                    />

                </View>


                {/* ================================================= */}
                {/* SALVAR */}
                {/* ================================================= */}

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

        </SafeAreaView>
    );
}