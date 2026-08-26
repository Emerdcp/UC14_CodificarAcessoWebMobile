# Documentação --- Login com Google no React Native + Expo

## 1. Objetivo

Este documento registra a implementação de autenticação com Google
realizada no aplicativo **DesviaAi**, desenvolvido com **React Native +
Expo**.

O fluxo implementado permite:

1.  Abrir a tela de Login.
2.  Selecionar **Entrar com Google**.
3.  Autenticar o usuário usando a conta Google.
4.  Após a autenticação, navegar para a tela `Home`.
5.  Na Home, utilizar o botão **Sair**.
6.  Encerrar a sessão do Google no aplicativo e retornar para a tela de
    Login.

------------------------------------------------------------------------

## 2. Tecnologias utilizadas

  ---------------------------------------------------------------------------------------------
  Tecnologia/Biblioteca                         Função                  Versão usada
  --------------------------------------------- ----------------------- -----------------------
  React Native                                  Desenvolvimento mobile  0.81.5

  Expo                                          Plataforma/framework do SDK 54
                                                projeto                 

  `@react-native-google-signin/google-signin`   Autenticação com Google 16.1.4

  `expo-dev-client`                             Development Build com   6.0.21
                                                código nativo           

  `expo-secure-store`                           Armazenamento seguro;   15.0.8
                                                útil para sessão futura 

  `@expo/vector-icons`                          Ícones da interface     15.0.3

  `@react-navigation/native`                    Navegação               7.3.14

  `@react-navigation/native-stack`              Navegação Stack         7.18.6

  `react-native-maps`                           Mapas; temporariamente  1.20.1
                                                não utilizado           
  ---------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 3. Biblioteca principal: Google Sign-In

A biblioteca utilizada foi:

``` text
@react-native-google-signin/google-signin
```

Instalação:

``` bash
npx expo install @react-native-google-signin/google-signin
```

Ela fornece a integração nativa com o Google Sign-In.

Documentação oficial:

https://react-native-google-signin.github.io/docs/original

------------------------------------------------------------------------

## 4. Por que foi necessário usar uma Development Build?

`@react-native-google-signin/google-signin` utiliza código nativo.

Por isso, a integração não funciona simplesmente dentro do Expo Go. Foi
necessário utilizar `expo-dev-client` e gerar uma Development Build pelo
EAS.

Instalação:

``` bash
npx expo install expo-dev-client
```

O próprio Expo orienta utilizar uma Development Build para bibliotecas
de autenticação que exigem código nativo.

Fonte:

https://docs.expo.dev/guides/google-authentication/

------------------------------------------------------------------------

## 5. Configuração no Google Cloud

Foi criado o projeto:

``` text
DesviaAi
```

No Google Cloud foram configurados clientes OAuth 2.0 para Android e
Web.

### Cliente Android

Relacionado ao aplicativo:

``` text
com.desviaai.app
```

Na configuração Android são utilizados dados como:

-   Nome do pacote;
-   SHA-1 do certificado de assinatura.

### Cliente Web

O `webClientId` utilizado pelo código deve ser o OAuth Client ID do tipo
**Web**.

Exemplo:

``` text
575970714704-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
```

Não deve ser utilizado o Client ID Android no parâmetro `webClientId`.

Fonte:

https://react-native-google-signin.github.io/docs/troubleshooting

------------------------------------------------------------------------

## 6. Configuração do app.json

Foi adicionado o plugin da biblioteca:

``` json
{
  "expo": {
    "plugins": [
      "expo-secure-store",
      "@react-native-google-signin/google-signin"
    ]
  }
}
```

O plugin permite que a integração nativa seja configurada durante o
prebuild/build.

------------------------------------------------------------------------

## 7. Serviço `googleAuth.ts`

Foi criado um serviço para centralizar a configuração e as operações de
autenticação.

Arquivo:

``` text
src/services/googleAuth.ts
```

### Configuração

``` tsx
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export function configurarGoogle() {
    GoogleSignin.configure({
        webClientId:
            "SEU_WEB_CLIENT_ID.apps.googleusercontent.com",
    });
}
```

O valor real deve ser obtido no Google Cloud Console.

### Login

Exemplo:

``` tsx
export async function loginComGoogle() {

    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    return response;
}
```

O fluxo é:

``` text
hasPlayServices()
       ↓
signIn()
       ↓
Google autentica
       ↓
resultado retornado
```

A documentação da biblioteca informa que `configure()` deve ser chamado
antes de `signIn()` ou `signInSilently()`.

Fonte:

https://react-native-google-signin.github.io/docs/original

------------------------------------------------------------------------

## 8. Configuração no App.tsx

A configuração foi executada na inicialização do aplicativo:

``` tsx
import { useEffect } from 'react';

import AppRoutes from '@/navigation/AppRoutes';

import { configurarGoogle } from '@/services/googleAuth';

export default function App() {

    useEffect(() => {
        configurarGoogle();
    }, []);

    return <AppRoutes />;
}
```

O `useEffect` executa a configuração quando o componente principal é
carregado.

------------------------------------------------------------------------

## 9. Botão "Entrar com Google"

Na tela de Login foi utilizado um botão personalizado:

``` tsx
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
```

O botão chama `handleGoogleLogin`.

------------------------------------------------------------------------

## 10. Função `handleGoogleLogin`

``` tsx
const handleGoogleLogin = async () => {

    try {

        const response = await loginComGoogle();

        console.log("Login realizado:", response);

        navigation.replace('Home');

    } catch (error) {

        console.error("Falha no login:", error);

        Alert.alert(
            "Erro",
            "Não foi possível realizar o login com Google."
        );
    }
};
```

### Fluxo

``` text
Botão Google
     ↓
handleGoogleLogin()
     ↓
loginComGoogle()
     ↓
GoogleSignin.signIn()
     ↓
Autenticação
     ↓
navigation.replace('Home')
     ↓
Home
```

------------------------------------------------------------------------

## 11. Logout

Para sair do Google dentro do aplicativo foi utilizado:

``` tsx
GoogleSignin.signOut();
```

Na tela `Home`:

``` tsx
import { GoogleSignin } from '@react-native-google-signin/google-signin';
```

Função:

``` tsx
async function handleLogout() {

    try {

        await GoogleSignin.signOut();

    } catch (error) {

        console.error(
            'Erro ao sair do Google:',
            error
        );

    } finally {

        navigation.replace('Login');

    }
}
```

Botão:

``` tsx
<TouchableOpacity
    style={style.logoutButton}
    onPress={handleLogout}
    activeOpacity={0.8}
>
    <Text style={style.logoutButtonText}>
        Sair
    </Text>
</TouchableOpacity>
```

A documentação define `signOut()` como o método para desconectar o
usuário atual.

Fonte:

https://react-native-google-signin.github.io/docs/original

------------------------------------------------------------------------

## 12. `signOut()` x `revokeAccess()`

### `signOut()`

``` tsx
await GoogleSignin.signOut();
```

Usado quando o usuário deseja simplesmente sair do aplicativo.

É o método utilizado neste projeto.

### `revokeAccess()`

``` tsx
await GoogleSignin.revokeAccess();
```

Remove a autorização concedida pelo usuário ao aplicativo.

É uma ação mais forte e não deve ser usada como simples botão "Sair".

------------------------------------------------------------------------

## 13. Navegação

Depois do login:

``` tsx
navigation.replace('Home');
```

Depois do logout:

``` tsx
navigation.replace('Login');
```

O uso de `replace` evita deixar a tela anterior disponível na pilha de
navegação.

Fluxo:

``` text
LOGIN
  │
  ├── Login manual ─────┐
  │                     │
  └── Google ───────────┤
                        ↓
                       HOME
                        │
                       Sair
                        ↓
                       LOGIN
```

------------------------------------------------------------------------

## 14. EAS Build

Para preparar o projeto:

``` bash
npx eas-cli@latest build:configure
```

Para gerar a Development Build Android:

``` powershell
npx eas-cli@latest build --profile development --platform android
```

O EAS realizou o build, assinou o aplicativo com as credenciais Android
configuradas e disponibilizou a Development Build para instalação no
emulador Pixel 9.

------------------------------------------------------------------------

## 15. Credenciais Android e SHA-1

Durante a configuração do EAS foi criada uma keystore Android.

A keystore é utilizada para assinar o aplicativo.

Foi obtido também o SHA-1 do certificado de assinatura.

O SHA-1 é importante para a configuração do cliente OAuth Android no
Google Cloud.

Atenção: em diferentes ambientes de assinatura podem existir
certificados diferentes. Em desenvolvimento, EAS e Google Play, os
fingerprints podem ser diferentes.

------------------------------------------------------------------------

## 16. Problemas encontrados

### 16.1 Certificado SSL institucional

Durante a execução do EAS CLI apareceu:

``` text
self-signed certificate in certificate chain
```

A rede utilizada no ambiente de desenvolvimento possui configuração
institucional de certificados.

Para o ambiente de desenvolvimento foi utilizado temporariamente:

``` powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
```

Isso desativa a validação normal dos certificados TLS e reduz a
segurança da conexão.

Não é recomendado utilizar essa configuração como solução permanente em
produção.

------------------------------------------------------------------------

### 16.2 Assets do Expo

Durante o prebuild apareceu:

``` text
ENOENT:
no such file or directory,
assets/adaptive-icon.png
```

O problema ocorreu porque arquivos configurados no `app.json` não
existiam nos caminhos informados.

Exemplo:

``` json
"icon": "./assets/icon.png"
```

O arquivo precisa existir em:

``` text
assets/icon.png
```

------------------------------------------------------------------------

### 16.3 Google Maps

O projeto possui:

``` text
react-native-maps
```

Quando o `MapView` foi carregado no Android apareceu:

``` text
java.lang.IllegalStateException:
API key not found
```

O stack trace apresentava:

``` text
com.google.android.gms.maps
com.rnmaps.maps.MapView
```

Esse erro não estava relacionado ao Google Login.

O login estava funcionando e o erro acontecia quando a Home tentava
carregar o Google Maps sem a API Key necessária.

Para o escopo atual, o mapa foi temporariamente substituído por um
espaço reservado.

------------------------------------------------------------------------

## 17. Resultado obtido

A autenticação Google foi implementada com sucesso.

O fluxo final é:

``` text
┌──────────────────┐
│      LOGIN       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Entrar com Google│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Google Sign-In   │
│  Autenticação    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│      HOME        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│       Sair       │
└────────┬─────────┘
         │
         ▼
GoogleSignin.signOut()
         │
         ▼
┌──────────────────┐
│      LOGIN       │
└──────────────────┘
```

------------------------------------------------------------------------

## 18. Comandos utilizados

Instalar Google Sign-In:

``` bash
npx expo install @react-native-google-signin/google-signin
```

Instalar Development Client:

``` bash
npx expo install expo-dev-client
```

Verificar projeto:

``` bash
npx expo-doctor
```

Verificar configuração Expo:

``` bash
npx expo config --type public
```

Gerar código Android:

``` bash
npx expo prebuild --clean --platform android
```

Configurar EAS:

``` bash
npx eas-cli@latest build:configure
```

Gerar Development Build:

``` bash
npx eas-cli@latest build --profile development --platform android
```

Iniciar o projeto:

``` bash
npx expo start --dev-client
```

------------------------------------------------------------------------

## 19. Referências oficiais

### React Native Google Sign In

Documentação principal:

https://react-native-google-signin.github.io/docs/original

API:

https://react-native-google-signin.github.io/docs/api

Configuração:

https://react-native-google-signin.github.io/docs/setting-up/get-config-file

Troubleshooting:

https://react-native-google-signin.github.io/docs/troubleshooting

### Expo

Guia de autenticação com Google:

https://docs.expo.dev/guides/google-authentication/

Autenticação no Expo:

https://docs.expo.dev/develop/authentication/

Expo SDK 54:

https://docs.expo.dev/versions/v54.0.0/

------------------------------------------------------------------------

## 20. Observação sobre versões

Versões registradas no projeto durante a implementação:

``` text
Expo SDK: 54
React Native: 0.81.5
React: 19.1.0
@react-native-google-signin/google-signin: 16.1.4
expo-dev-client: 6.0.21
```

As bibliotecas podem receber atualizações. Para manutenção futura,
consulte sempre a documentação oficial antes de atualizar versões ou
alterar configurações nativas.

------------------------------------------------------------------------

## 21. Conclusão

A integração demonstra como uma aplicação React Native desenvolvida com
Expo pode utilizar autenticação de terceiros através do Google.

A solução utiliza:

-   Google Cloud para criação dos clientes OAuth;
-   OAuth 2.0 para identificação/autorização;
-   `@react-native-google-signin/google-signin` para integração nativa;
-   Expo Config Plugin para integração com o projeto;
-   EAS Build para gerar a Development Build Android;
-   React Navigation para controlar o fluxo Login → Home;
-   `GoogleSignin.signOut()` para encerrar a sessão do Google.

A implementação separa configuração, autenticação, interface e
navegação, permitindo que o projeto evolua posteriormente para um
sistema completo de autenticação com backend, persistência de sessão e
controle de usuários.
