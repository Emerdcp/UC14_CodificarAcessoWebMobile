import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'desviaai_usuario';

export async function salvarSessao(usuario: any) {

    await SecureStore.setItemAsync(
        SESSION_KEY,
        JSON.stringify(usuario)
    );
}

export async function obterSessao() {

    const sessao =
        await SecureStore.getItemAsync(
            SESSION_KEY
        );

    if (!sessao) {
        return null;
    }

    return JSON.parse(sessao);
}

export async function removerSessao() {

    await SecureStore.deleteItemAsync(
        SESSION_KEY
    );
}