# Desenvolvimento de Aplicativos com React Native

## Capítulo 1 – Introdução

### Objetivo

Este documento tem como objetivo apresentar o processo de desenvolvimento de um aplicativo utilizando React Native, desde a criação do projeto até a implementação de autenticação com provedores externos, como Google e Meta.

Ao final deste guia, o desenvolvedor será capaz de criar uma aplicação moderna utilizando boas práticas, arquitetura organizada e autenticação segura.

---

# Capítulo 2 – Tecnologias

## Front-end

| Tecnologia        | Finalidade                     |
| ----------------- | ------------------------------ |
| React Native      | Desenvolvimento Mobile         |
| Expo              | Ambiente de desenvolvimento    |
| TypeScript        | Tipagem do código              |
| React Navigation  | Navegação entre telas          |
| Axios             | Comunicação com APIs           |
| React Hook Form   | Manipulação de formulários     |
| Zod               | Validação de dados             |
| AsyncStorage      | Armazenamento local            |
| Expo Secure Store | Armazenamento seguro de tokens |

---

## Back-end (opcional)

Caso exista um servidor próprio.

* Node.js
* Express
* JWT
* MySQL
* Prisma ou Sequelize

---

# Capítulo 3 – Ferramentas

## Editor

* Visual Studio Code

## Emulador Android

* Android Studio

## Testes iOS

* Xcode (macOS)

## Controle de versão

* Git
* GitHub

---

# Capítulo 4 – Criando o Projeto

Criar um novo projeto Expo com TypeScript:

```bash
npx create-expo-app ProjetoDesviaLogin --template blank-typescript@sdk-54
```

Entrar na pasta:

```bash
cd MeuProjeto
```

Executar:

```bash
npx expo start
```

---

# Capítulo 5 – Organização do Projeto

Uma estrutura organizada facilita a manutenção e a escalabilidade da aplicação.

```text
src/
│
├── assets/
├── components/
├── screens/
├── routes/
├── services/
├── storage/
├── hooks/
├── contexts/
├── types/
├── utils/
└── constants/
```

Descrição:

* **assets**: imagens, fontes e ícones.
* **components**: componentes reutilizáveis.
* **screens**: telas do aplicativo.
* **routes**: configuração da navegação.
* **services**: integração com APIs e serviços externos.
* **storage**: persistência local.
* **hooks**: hooks personalizados.
* **contexts**: gerenciamento de estado global.
* **types**: definições TypeScript.
* **utils**: funções auxiliares.
* **constants**: constantes da aplicação.

---

# Capítulo 6 – Bibliotecas

## Navegação

Uma das primeiras funcionalidades de qualquer aplicativo é a navegação entre telas.

Bibliotecas:

* React Navigation
* React Native Screens
* React Native Safe Area Context

Documentação oficial:

[React Navigation](https://reactnavigation.org/?utm_source=chatgpt.com)

### instalação

- O @react-navigation/nativepacote contém a funcionalidade principal do React Navigation

```powershell
npm install @react-navigation/native
```

- Instalando dependências, instale as dependências usadas pela maioria dos navegadores

```powershell
npx expo install react-native-screens react-native-safe-area-context
```

---

## Requisições HTTP

Para comunicação com APIs REST.

Biblioteca:

* Axios

Documentação:

[Axios](https://axios-http.com/?utm_source=chatgpt.com)


### Expo AuthSession
- Uma biblioteca universal que fornece uma API para lidar com autenticação baseada em navegador.

```powershell
npx expo install expo-auth-session expo-crypto
```


---

## Formulários

Para criação de formulários de maneira eficiente.

Bibliotecas:

* React Hook Form
* Zod

Documentações:

* [React Hook Form](https://react-hook-form.com/?utm_source=chatgpt.com)
* [Zod](https://zod.dev/?utm_source=chatgpt.com)

---

## Armazenamento Local

Existem duas abordagens principais:

### AsyncStorage

Utilizado para dados não sensíveis.

Documentação:

[AsyncStorage](https://react-native-async-storage.github.io/async-storage/?utm_source=chatgpt.com)

### Secure Store

Utilizado para armazenar informações sensíveis, como tokens de autenticação.

Documentação:

[Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/?utm_source=chatgpt.com)

---

# Capítulo 7 – Autenticação

A autenticação permite identificar usuários e controlar o acesso às funcionalidades da aplicação.

As formas mais comuns são:

* E-mail e senha
* Google
* Meta (Facebook)
* Microsoft
* GitHub

---

# Capítulo 8 – Login com Google

## Como funciona

```text
Aplicativo

↓

Usuário clica em "Entrar com Google"

↓

Google solicita autorização

↓

Usuário seleciona uma conta

↓

Google retorna um Token de Identidade (ID Token)

↓

Aplicativo envia o token para o backend

↓

Backend valida a autenticidade do token

↓

Backend cria ou localiza o usuário

↓

Backend retorna um JWT da aplicação

↓

Aplicativo armazena o JWT e libera o acesso
```

### Biblioteca recomendada (Expo)

Para projetos Expo, a integração oficial é feita com:

[Expo AuthSession](https://docs.expo.dev/versions/latest/sdk/auth-session/?utm_source=chatgpt.com)

Ela implementa o fluxo OAuth 2.0 e OpenID Connect, sendo a opção recomendada para autenticação com o Google.

Também será necessário criar um projeto no:

[Google Cloud Console](https://console.cloud.google.com/?utm_source=chatgpt.com)

Nele você irá:

1. Criar um projeto.
2. Configurar a tela de consentimento OAuth.
3. Criar um Client ID para Android, Web (conforme necessário).
4. Informar esses IDs na aplicação.

---

# Capítulo 9 – Login com Meta (Facebook)

## Como funciona

```text
Aplicativo

↓

Usuário escolhe "Entrar com Facebook"

↓

Meta solicita autorização

↓

Usuário concede acesso

↓

Meta retorna um Access Token

↓

Aplicativo envia o token para o backend

↓

Backend valida o token junto à Meta

↓

Backend cria ou recupera o usuário

↓

Backend retorna um JWT próprio da aplicação

↓

Aplicativo salva o JWT e libera o acesso
```

Para usar o Login do Facebook, é necessário criar um aplicativo na plataforma de desenvolvedores da Meta:

[Meta for Developers](https://developers.facebook.com/?utm_source=chatgpt.com)

Você deverá:

1. Criar um App.
2. Adicionar o produto **Facebook Login**.
3. Configurar as plataformas (Android/iOS).
4. Obter o **App ID** e, quando necessário, o **Client Token**.
5. Configurar as URLs de redirecionamento.

Em projetos Expo, esse fluxo também pode ser integrado utilizando OAuth, normalmente com o suporte do `expo-auth-session`.

---

# Capítulo 10 – Fluxo de Autenticação Recomendado

Independentemente do provedor (Google, Meta, ou Microsoft), a arquitetura recomendada é:

```text
Aplicativo React Native

↓

Provedor de Login (OAuth)

↓

Recebe Token de Identidade

↓

Backend

↓

Validação do Token

↓

Banco de Dados

↓

JWT da Aplicação

↓

Secure Store

↓

Usuário autenticado
```

> **Importante:** evite confiar apenas no token recebido pelo aplicativo. Em aplicações com backend próprio, o mais seguro é enviar esse token ao servidor, validá-lo junto ao provedor e emitir um JWT da própria aplicação para controlar sessões e permissões.

---

## Próximos capítulos sugeridos

Depois dessa introdução, eu seguiria com uma sequência prática:

1. **Arquitetura de pastas** (explicando a função de cada diretório).
2. **Instalação e configuração de todas as bibliotecas**.
3. **Configuração do React Navigation**.
4. **Criação do tema (cores, fontes e espaçamentos)**.
5. **Implementação do Login com Google passo a passo**.
6. **Implementação do Login com Meta passo a passo**.
7. **Gerenciamento de autenticação com Context API**.
8. **Persistência da sessão usando Secure Store**.
9. **Proteção de rotas**.
10. **Integração com um backend Node.js para validação dos tokens**.

Esse formato cria uma documentação progressiva: o leitor entende primeiro os conceitos e, em seguida, implementa cada recurso com exemplos práticos.
















---

# Projeto: Desenvolvimento de Aplicativo React Native

## Objetivo

Desenvolver um aplicativo utilizando React Native com arquitetura escalável, autenticação, integração com banco de dados e interface moderna.

Inicialmente será utilizado um login local (mock) para acelerar o desenvolvimento das telas. Após a conclusão da interface e da navegação, a autenticação será substituída pelo Login Google e outros provedores.

---

# FASE 1 — Planejamento

Antes de escrever qualquer código, definimos:

* Objetivo do aplicativo
* Público-alvo
* Funcionalidades
* Fluxo de navegação
* Identidade visual
* Paleta de cores
* Tipografia
* Componentes reutilizáveis
* Arquitetura

---

# FASE 2 — Identidade Visual

Já temos um bom ponto de partida.

## Logo

✅ Ícone do aplicativo

* Localização
* Buraco
* Foto
* Compartilhamento

---

## Paleta de cores

| Elemento         | Cor          | HEX       |
| ---------------- | ------------ | --------- |
| Primária         | Azul Escuro  | `#0F172A` |
| Secundária       | Azul         | `#2563EB` |
| Sucesso          | Verde        | `#14B8A6` |
| Alerta           | Amarelo      | `#F59E0B` |
| Erro             | Vermelho     | `#EF4444` |
| Fundo            | Cinza Claro  | `#F8FAFC` |
| Branco           | Branco       | `#FFFFFF` |
| Texto Principal  | Cinza Escuro | `#1E293B` |
| Texto Secundário | Cinza Médio  | `#64748B` |

Essa paleta transmite confiança, modernidade e boa legibilidade.

---

## Tipografia

Sugiro usar:

* **Poppins**
* ou **Inter**

São fontes modernas, muito utilizadas em aplicativos.

---

# FASE 3 — Estrutura do Projeto

```text
src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│
├── components/
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   ├── Header/
│   ├── Avatar/
│   ├── Loading/
│   ├── Modal/
│   └── Toast/
│
├── screens/
│   ├── Splash/
│   ├── Login/
│   ├── Home/
│   ├── Perfil/
│   ├── NovoRegistro/
│   ├── Detalhes/
│   └── Configuracoes/
│
├── routes/
│
├── services/
│
├── storage/
│
├── hooks/
│
├── contexts/
│
├── theme/
│
├── types/
│
└── utils/
```

---

# FASE 4 — Tema Global

Teremos um único arquivo para definir:

```text
Cores

Fontes

Tamanhos

Espaçamentos

Border Radius

Sombras
```

Assim todo o aplicativo mantém o mesmo padrão visual.

---

# FASE 5 — Componentes

Antes das telas, criaremos todos os componentes reutilizáveis.

Por exemplo:

```text
Button

Input

InputPassword

Card

Avatar

Loading

Header

BottomTab

Modal

Toast

Badge

FloatingButton
```

Depois basta reutilizá-los em todas as telas.

---

# FASE 6 — Protótipos

Antes de conectar ao banco, construiremos toda a interface.

As telas previstas serão:

### Splash

Logo

Nome do aplicativo

Loading

---

### Login

Logo

Email

Senha

Entrar

Entrar com Google (desabilitado inicialmente)

Esqueci minha senha

Criar conta

---

### Home

Mapa

Botão de registrar ocorrência

Últimas ocorrências

Menu

---

### Perfil

Foto

Nome

Email

Editar Perfil

Logout

---

### Nova Ocorrência

Foto

Descrição

Endereço

Mapa

Salvar

---

### Detalhes

Imagem

Status

Data

Localização

Comentários

---

# FASE 7 — Banco de Dados

Mesmo utilizando um login provisório, criaremos o banco corretamente.

Tabela de usuários:

```sql
usuarios

id

nome

email

senha

foto

status

created_at

updated_at
```

No início, usaremos uma senha fixa apenas para facilitar os testes.

Exemplo:

```
Email

admin@email.com

Senha

123456
```

A aplicação validará esses dados localmente ou via uma API simples.

Depois substituiremos pela autenticação real.

---

# FASE 8 — Navegação

Inicialmente teremos:

```text
Splash

↓

Login

↓

Home
```

Depois:

```text
Home

↓

Perfil

↓

Nova Ocorrência

↓

Detalhes

↓

Configurações
```

---

# FASE 9 — Integração

Somente quando todas as telas estiverem prontas, iniciaremos:

* API
* Banco
* JWT
* Login Google
* Login Meta
* Upload de imagens
* Geolocalização
* Notificações

---

# FASE 10 — Login Google

Nesta etapa, substituiremos o login provisório pelo fluxo OAuth.

Fluxo:

```text
Aplicativo

↓

Google

↓

Token

↓

Backend

↓

JWT

↓

Home
```

Nenhuma tela precisará ser alterada, apenas a lógica de autenticação.

---

# Minha sugestão: vamos trabalhar como em uma empresa

Em vez de sair criando telas aleatoriamente, proponho seguirmos um cronograma de desenvolvimento:

| Etapa                                      | Status          |
| ------------------------------------------ | --------------- |
| 📖 Documentação do projeto                 | 🔄 Em andamento |
| 🎨 Identidade visual (logo, cores, fontes) | ✅               |
| 🏗️ Estrutura do projeto                   | ⏳               |
| 🎭 Tema global (cores e estilos)           | ⏳               |
| 🧩 Componentes reutilizáveis               | ⏳               |
| 📱 Protótipos das telas                    | ⏳               |
| 🧭 Navegação entre telas                   | ⏳               |
| 🗄️ Banco de dados                         | ⏳               |
| 🔐 Login com e-mail (provisório)           | ⏳               |
| ☁️ Integração com API                      | ⏳               |
| 🔑 Login Google                            | ⏳               |
| 📍 Geolocalização                          | ⏳               |
| 📷 Câmera e upload de fotos                | ⏳               |
| 🚀 Publicação do aplicativo                | ⏳               |

A vantagem dessa metodologia é que você terá um projeto organizado desde o início, com uma documentação que acompanha o desenvolvimento. Ao final, o trabalho não será apenas um aplicativo funcional, mas também um material técnico completo que demonstra o processo de engenharia de software, desde a arquitetura até a implementação. Isso agrega muito valor em apresentações acadêmicas e no seu portfólio.
