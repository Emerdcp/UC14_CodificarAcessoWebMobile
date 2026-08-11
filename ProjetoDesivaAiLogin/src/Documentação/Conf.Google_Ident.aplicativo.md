# Identificação do aplicativo Android

## Objetivo

Definir um identificador único para a aplicação Android que será
utilizado durante a configuração da autenticação com o Google.

## Nome da aplicação

DesviaAi

## Android Package

com.desviaai.app

## Importância

O Android Package identifica exclusivamente a aplicação dentro do
ecossistema Android.

Durante a configuração da autenticação Google, o package name será
associado às credenciais OAuth da aplicação.

Além do package name, o Google utiliza a impressão digital SHA-1 do
certificado de assinatura para validar a identidade da aplicação.

## Configuração

A identificação foi definida no arquivo app.json:

"android": {
    "package": "com.desviaai.app"
}

## Próxima etapa

Após definir o identificador da aplicação, será criado e configurado
o projeto no Google Cloud Console.