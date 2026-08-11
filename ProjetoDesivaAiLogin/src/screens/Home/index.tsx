import {
    Text,
    View,
} from 'react-native';

import MapView, {
    Marker,
} from 'react-native-maps';

import {
    NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Button from '@/components/Button';

import { RootStackParamList } from '@/navigation/AppRoutes';

import { style } from './style';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'Home'
>;

export default function Home({ navigation }: Props) {

    function handleLogout() {
        navigation.replace('Login');
    }

    return (
        <View style={style.container}>

            {/* Cabeçalho */}
            <View style={style.header}>

                <Text style={style.headerTitle}>
                    DesviaAi
                </Text>

            </View>

            {/* Mapa */}
            <View style={style.mapContainer}>

                <MapView
                    style={style.map}
                    initialRegion={{
                        latitude: -22.7425,
                        longitude: -47.3394,
                        latitudeDelta: 0.005, 
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: -22.7425, longitude: -47.3394 }}
                        title="Senac Americana"
                        description="Rua Dr. Angelino Sanches, 800 - Vila Gallo"
                    />
                </MapView>

            </View>

            {/* Rodapé */}
            <View style={style.footer}>

                <Button
                    title="Sair"
                    variant="secondary"
                    onPress={handleLogout}
                />

            </View>

        </View>
    );
}