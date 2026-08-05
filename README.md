# UC13_CodificarAplicacoesDispositivosMoveis
UC13: Codificar aplicações para dispositivos móveis.


# UC13_CodificarAplicacoesDispositivosMoveis
UC13: Codificar aplicações para dispositivos móveis.

# Iniciando um Projeto

- Selecione a pasta para poder fazer a instalação.

```sql
npx create-expo-app --template
```
Escolher versão. para escolher uma versão anterior
```sql
npx create-expo-app nome-app --template blank-typescript@sdk-54
```


- Escolha o nome do projeto.

Onde está *my-app*

- Selecione **Blank (TypeScript)**

![alt text](2026.05.04_Revisao/imagem/image.png)

- Configuração para abrir ele no Android

### Acessar a pasta, e rodar o comando rodar o projeto.
Roda primeiro
```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
```
Depois
```sql
npx expo start
```

- Vamos instalar um emulador https://expo.dev/go para poder rodar o projeto no Andriod.

Selecione a versão do API

![alt text](2026.05.04_Revisao/imagem/image-1.png)

- Copiar o link e ir no android.

![alt text](2026.05.04_Revisao/imagem/image-2.png)

- Acessa o Google pelo emulador.

![alt text](2026.05.04_Revisao/imagem/image-3.png)

- Colar e dar um enter e fazer o downloads.

![alt text](2026.05.04_Revisao/imagem/image-4.png)

- Aceitar as funções, verificar porque pode estar aberto em outra APP, precisa minimizar.

### Para rodar depois da configuração, para rodar OFFLINE ------- Usar no powershell

```
npx expo start --offline
```
- Depois vamos usar o opção **A** para rodar no android.

![alt text](2026.05.04_Revisao/imagem/image-5.png)

# Para configurar as pasta e aparecer raiz.

- Dar um Control + Shift + P.

Digitar "User Settings (JSON)"

- No último linha, colocar virgula e digitar.

![alt text](2026.05.04_Revisao/imagem/image-6.png)

"explorer.compactFolders": false,

![alt text](2026.05.04_Revisao/imagem/image-7.png)



## Instalar Lucide

```sql
npm install lucide-react-native

npm install lucide-react-native react-native-svg
```

## Desbloquear powershell para rodar scripts npx/npm
 
TypeScript
```sql
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
 
## comando para desbloquear o expo no terminal é preciso rodar toda vez que abrir o terminal
 
TypeScript
```sql
$env:NODE_TLS_REJECT_UNAUTHORIZED="0"
```

## instalar o async storage
 
TypeScript
```sql
npx expo install @react-native-async-storage/async-storage
```


## Ajustar o PATH

Acessar tsconfig.json

  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*":[
        "./src/*"
      ]
    }
  }


## Não pode de esquecer de altear

Fica na index.ts

import App from './src/app/Home';

Tem que colocar o caminho para acesso.








## Alteração de configuração correto do projeto.

- Precisar criar as pasta scr/app/Home

- Temos que trazer a arquivo da pasta App.tsx para Home.

![alt text](2026.05.04_Revisao/imagem/image-8.png)

- Alterar para o App.tsx para Home.tsx

- Dentro da Index, corrigir o caminho.

```sql
export default function Home()
```


# Configuração para uso em Web.

- Usar npm install sempre para um novo PC para poder instalar as informação.

```sql
npm install
```

- Depois rodar o comando para verificar a instalação.

```sql
npx expo install react-dom react-native-web
```

- Se apresentar erro, usar a descrição complementar

```sql
npm install react-dom react-native-web
```

- Erro apresentado por causa das dependências;
```sql
npm install react-dom react-native-web --legacy-peer-deps
```

Com isso vai funcionar na web.

- Ai só rodar novamente o comando para poder rodar, e clica o W para acessar web

```
npx expo start --offline
```

- não esquecer de ver se tem o expo go instalado se não funcionar, qualquer coisa pegar e baixar pelo link expo go, excolher uma versão antes, de baixa android, não esquecer de copiar o colocar o link gerado a baixo, e colocar no emulador.





# Geração de de APP

Link para fazer Icone do App

https://www.figma.com/community/file/1637141012732584189/expo-app-icon-splash-sdk-54-community

Aqui vamos apreender como fazer para poder baixar o APP para um celular android.

01. Instalar a biclioteca
```sql
npx expo install expo-dev-client
```

02. Rodar comando para gerar a pasta android do projeto
```sql
npx expo prebuild
```

03. Acessa a pasta Android
```sql
cd android
```

- Obs: Pegar o arquivo gradle-8.14.3.7z baixado e colocado dentro da pasta
C:\Users\emerson.cpinto\.gradle\wrapper\dists\gradle-8.14.3-bin\cv11ve7ro1n3o1j4so8xd9n66
Dentro do seu usuário, até então funcionamento dentro do Senac.

Acessa pasta Android/gradle/gradle-wrapper.properties e coloca o caminho e nome zipado.
distributionUrl=file:///C:/Users/emerson.cpinto/.gradle/wrapper/dists/gradle-8.14.3-bin/cv11ve7ro1n3o1j4so8xd9n66/gradle-8.14.3.zip

Rodar este caminho antes.
($env:JAVA_TOOL_OPTIONS="-Djavax.net.ssl.trustStoreType=WINDOWS-ROOT -Djavax.net.ssl.trustStore=NONE")

04. Rodar o comando vai rodar um script para copilação do projeto.
```sql
.\gradlew assembleRelease
```









# Para rodar Sistema no power Shel

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

$env:NODE_TLS_REJECT_UNAUTHORIZED="0"

npx expo start 


Rodar sempre para iniciar a pasta....

