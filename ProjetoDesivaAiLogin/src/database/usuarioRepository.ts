import { getDatabase } from './database';

export type UsuarioGoogle = {
    id?: number;
    google_id: string;
    nome: string;
    email: string;
    foto_url?: string | null;
};


export async function buscarUsuarioPorGoogleId(
    googleId: string
) {

    const db = await getDatabase();

    const usuario = await db.getFirstAsync<UsuarioGoogle>(
        `
        SELECT
            id,
            google_id,
            nome,
            email,
            foto_url
        FROM usuarios
        WHERE google_id = ?
        LIMIT 1
        `,
        googleId
    );

    return usuario ?? null;
}


export async function cadastrarUsuario(
    usuario: UsuarioGoogle
) {

    const db = await getDatabase();

    const agora = new Date().toISOString();

    await db.runAsync(
        `
        INSERT INTO usuarios (
            google_id,
            nome,
            email,
            foto_url,
            tipo_login,
            ativo,
            ultimo_login,
            criado_em,
            atualizado_em
        )
        VALUES (?, ?, ?, ?, 'GOOGLE', 1, ?, ?, ?)
        `,
        usuario.google_id,
        usuario.nome,
        usuario.email,
        usuario.foto_url ?? null,
        agora,
        agora,
        agora
    );

    console.log(
        'Usuário Google cadastrado no SQLite.'
    );
}


export async function atualizarUltimoLogin(
    googleId: string
) {

    const db = await getDatabase();

    const agora = new Date().toISOString();

    await db.runAsync(
        `
        UPDATE usuarios
        SET
            ultimo_login = ?,
            atualizado_em = ?
        WHERE google_id = ?
        `,
        agora,
        agora,
        googleId
    );

    console.log(
        'Último login atualizado.'
    );
}


export async function listarUsuarios() {

    const db = await getDatabase();

    const usuarios = await db.getAllAsync(
        `
        SELECT
            id,
            google_id,
            nome,
            email,
            foto_url,
            tipo_login,
            ativo,
            ultimo_login,
            criado_em,
            atualizado_em
        FROM usuarios
        ORDER BY id DESC
        `
    );

    return usuarios;
}