import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '@/screens/Login';
import Home from '@/screens/Home';

import NovaOcorrencia from '@/screens/NovaOcorrencia';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    NovaOcorrencia: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
    usuarioLogado: boolean;
};

export default function AppRoutes({
    usuarioLogado
}: Props) {

    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName={
                    usuarioLogado
                        ? 'Home'
                        : 'Login'
                }
                screenOptions={{
                    headerShown: false,
                }}
            >

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Home"
                    component={Home}
                />

                <Stack.Screen
                    name="NovaOcorrencia"
                    component={NovaOcorrencia}
                />

            </Stack.Navigator>

        </NavigationContainer>
    );
}