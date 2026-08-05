# Notificacoes

Aplicativo mobile em **React Native + Expo + TypeScript**, com foco em componentes reutilizaveis.

## Tecnologias

- Expo SDK 54
- React 19
- React Native 0.81
- TypeScript

## Estrutura do projeto

```text
notificacoes/
  assets/
  src/
    components/
      Button/
        index.tsx
  App.tsx
  app.json
  index.ts
  package.json
  tsconfig.json
```

## Pre-requisitos

- Node.js 18+
- npm (ou yarn/pnpm)
- Expo Go no celular (opcional, para testes rapidos)

## Instalação

```bash
npm install
```

## Como executar

No ambiente do Senac

```bash
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
```

Caso o PowerShell esteja bloqueado
```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```


Iniciar ambiente de desenvolvimento:

```bash
npm expo start
```

## Configuracoes importantes

- Alias de importacao configurado em `tsconfig.json`:
  - `@/*` aponta para `./src/*`
- Exemplo no projeto:
  - `import Button from '@/components/Button'`

## Licenca

Defina aqui a licenca do projeto (ex.: MIT).
