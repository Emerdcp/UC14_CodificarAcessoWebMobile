Perfeito! A partir de agora vamos desenvolver como uma equipe de software faria. Eu vou assumir o papel de **Arquiteto de Software** e vamos construir tudo seguindo boas práticas.

Este não será apenas um projeto de React Native, será um projeto organizado, documentado e preparado para crescer.

---

# 🚀 Sprint 1 - Iniciando o Projeto

## 📌 Nome do Projeto

**DesviaAi**

---

# Objetivo da Sprint

Nesta Sprint vamos entregar:

✅ Projeto React Native criado

✅ Estrutura organizada

✅ Instalação das bibliotecas

✅ Tema do aplicativo

✅ Navegação

✅ Tela Login

✅ Tela Home

✅ Login Local

✅ Logout

---

# Etapa 1 - Criando o Projeto

Vamos utilizar Expo com TypeScript.

```bash
npx create-expo-app DesviaAi --template blank-typescript@sdk-54
```

Entrando na pasta

```bash
cd DesviaAi
```

Executar

```bash
npx expo start
```

---

# Etapa 2 - Instalando as Bibliotecas

Agora vamos instalar apenas o necessário.

## Navegação

```bash
npx expo install @react-navigation/native
```

Depois

```bash
npx expo install react-native-screens
```

```bash
npx expo install react-native-safe-area-context
```

```bash
npm install @react-navigation/native-stack
```

---

## Ícones

```bash
npx expo install @expo/vector-icons
```

---

## Secure Storage

Já vamos deixar preparado.

```bash
npx expo install expo-secure-store
```

---

## Splash Screen

Também vamos utilizar.

```bash
npx expo install expo-splash-screen
```

---

# Etapa 3 - Criando a Estrutura

Vamos apagar tudo que o Expo cria e deixar apenas nossa estrutura.

```text
DesviaAi/
│
├── assets/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   │
│   └── logo.png
│
├── src/
│
│   ├── components/
│   │
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Logo/
│   │
│   ├── screens/
│   │
│   │   ├── Login/
│   │   └── Home/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── storage/
│   │
│   ├── contexts/
│   │
│   ├── hooks/
│   │
│   ├── theme/
│   │
│   │   ├── colors.ts
│   │   ├── fonts.ts
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   └── index.ts
│   │
│   ├── types/
│   │
│   └── utils/
│
├── App.tsx
│
├── package.json
│
└── tsconfig.json
```

Essa estrutura é limpa, organizada e escalável.

---

# Etapa 4 - Theme

Antes de criar qualquer tela, teremos um Theme centralizado.

```text
theme/

colors.ts

fonts.ts

spacing.ts

radius.ts

index.ts
```

Todo componente utilizará essas configurações.

Isso garante consistência visual.

---

# Etapa 5 - Navegação

Inicialmente teremos apenas:

```text
Stack Navigator

↓

Login

↓

Home
```

No futuro:

```text
Bottom Tabs

↓

Mapa

↓

Ocorrências

↓

Perfil

↓

Configurações
```

Mas ainda não.

---

# Etapa 6 - Componentes

Nesta Sprint construiremos somente:

```text
Logo

Input

Button
```

Todos reutilizáveis.

---

# Etapa 7 - Login

Nossa tela será moderna.

```text
              LOGO


          Bem-vindo

Faça login para continuar


📧 Email

┌─────────────────────┐
│                     │
└─────────────────────┘


🔒 Senha

┌─────────────────────┐
│                     │
└─────────────────────┘


┌─────────────────────┐
│      Entrar         │
└─────────────────────┘


──────── ou ────────


┌─────────────────────┐
│ Entrar com Google   │
└─────────────────────┘


Versão 1.0
```

---

# Etapa 8 - Home

Bem simples.

```text
☰


Olá Emerson!

Bem-vindo ao DesviaAi


Você está autenticado.


┌─────────────────────┐
│       Sair          │
└─────────────────────┘
```

Depois essa tela será totalmente modificada.

---

# Etapa 9 - Login Local

Por enquanto:

```text
Email

admin@email.com

Senha

123456
```

Se estiver correto

↓

Home

Se não

↓

Mensagem

Email ou senha inválidos.

---

# Etapa 10 - Organização do Código

A partir de agora adotaremos alguns padrões:

## Nenhuma tela terá estilos internos.

Sempre:

```text
index.tsx

styles.ts
```

---

Nenhuma cor será escrita diretamente.

❌

```tsx
backgroundColor:"#2563EB"
```

Nunca.

Sempre:

```tsx
backgroundColor: colors.primary
```

---

Nenhuma fonte será escrita diretamente.

Sempre:

```tsx
fontFamily: fonts.bold
```

---

Nenhum componente será duplicado.

Tudo reutilizável.

---

# 📋 Nosso Backlog (Sprint 1)

| Item                    | Status |
| ----------------------- | :----: |
| Criar projeto Expo      |    ⬜   |
| Organizar pastas        |    ⬜   |
| Configurar Theme        |    ⬜   |
| Configurar Navegação    |    ⬜   |
| Criar componente Logo   |    ⬜   |
| Criar componente Input  |    ⬜   |
| Criar componente Button |    ⬜   |
| Tela Login              |    ⬜   |
| Tela Home               |    ⬜   |
| Login Local             |    ⬜   |
| Logout                  |    ⬜   |

---

## 📌 Uma pequena melhoria que eu faria

Como esse projeto será um material de estudo e também poderá servir como portfólio, eu faria uma pequena alteração na estrutura antes de escrever qualquer código:

```text
src/
│
├── assets/
├── components/
├── navigation/
├── screens/
├── theme/
├── services/
├── storage/
├── types/
├── utils/
└── constants/
```

**Por que `navigation` em vez de `routes`?**

Porque esse é o nome adotado pela maioria dos projetos React Native modernos e fica mais intuitivo quando começarmos a usar **Stack Navigator**, **Bottom Tabs** e **Drawer Navigation**. Além disso, separar `constants` (como textos, chaves e configurações) do `theme` deixa a arquitetura ainda mais limpa.

A partir da próxima etapa, começaremos a escrever código seguindo exatamente essa arquitetura. Tenho certeza de que, ao final, você terá um projeto com padrão profissional, fácil de manter e pronto para evoluir para login com Google, câmera, mapas e todas as demais funcionalidades.
