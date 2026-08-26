# OAuth Client ID Web

## Objetivo

Criar um cliente OAuth do tipo Web para ser utilizado pelo fluxo
de autenticação Google da aplicação.

## Cliente criado

Nome:
DesviaAi Web

Tipo:
Aplicativo da Web

## Utilização

O Client ID Web será utilizado na configuração da biblioteca
Google Sign-In através da propriedade `webClientId`.

## Observação

O Client ID Web possui finalidade diferente do Client ID Android.

O cliente Android está associado ao Package Name e ao SHA-1,
enquanto o cliente Web será utilizado na configuração do fluxo
de autenticação e obtenção do token de identificação.

## Resultado

Cliente OAuth Web criado com sucesso.



# Primeiro erro no Development Build

Durante a primeira tentativa de geração do Development Build,
o EAS conseguiu:

- autenticar na conta Expo;
- localizar o projeto;
- localizar as credenciais Android;
- utilizar a Keystore;
- compactar o projeto;
- enviar o projeto para o EAS.

Entretanto, o processo foi interrompido durante a etapa de
Prebuild.

Erro apresentado:

Android build failed:
Unknown error.
See logs of the Prebuild build phase for more information.

## Diagnóstico

O erro ocorreu antes da compilação final do aplicativo Android,
durante a geração/configuração do projeto nativo.

Será realizado um Prebuild local para obter uma mensagem de
erro mais detalhada antes de realizar uma nova tentativa.

# Correção do primeiro erro de Prebuild

## Erro

Durante o primeiro Development Build, o EAS apresentou falha
na etapa de Prebuild.

A análise local com:

npx expo prebuild --platform android

permitiu identificar a causa exata:

ENOENT: no such file or directory,
assets/adaptive-icon.png

## Causa

O arquivo `adaptive-icon.png` estava referenciado no `app.json`,
porém não existia na pasta `assets`.

## Solução

Como o projeto já possuía um ícone principal configurado em:

assets/icon.png

a configuração específica de Adaptive Icon foi removida do
`app.json`.

O aplicativo passou a utilizar o ícone principal configurado
em `expo.icon`.

## Regeneração

Após a correção, o projeto nativo será regenerado utilizando:

npx expo prebuild --clean --platform android



# Geração do Development Build

## Comando utilizado

npx eas-cli@latest build --profile development --platform android

## Perfil

development

## Plataforma

Android

## Resultado

O processo de build foi concluído com sucesso.

O EAS utilizou as credenciais Android configuradas no projeto,
incluindo a Keystore criada anteriormente.

## Desenvolvimento

Foi gerado um Development Build contendo o código nativo
necessário para a utilização da biblioteca:

@react-native-google-signin/google-signin

## Instalação

O EAS disponibilizou o Development Build para instalação
em dispositivos Android.

## Próxima etapa

Instalar a aplicação no dispositivo Android e verificar
a execução do aplicativo antes de implementar o fluxo
de autenticação Google.

# Development Build instalado

O Development Build Android foi gerado através do EAS Build
e instalado com sucesso no emulador Pixel 9.

## Resultado

Build:
548885b2-76e2-4009-b3a0-84cb7219715d

Plataforma:
Android

Perfil:
development

Status:
Concluído

Instalação:
Concluída

Execução:
Concluída

## Importância

A instalação confirma que o projeto possui um ambiente Android
nativo capaz de executar as bibliotecas que dependem de código
nativo, incluindo o Google Sign-In.

## Próxima etapa

Implementar a configuração da autenticação Google no código
React Native.