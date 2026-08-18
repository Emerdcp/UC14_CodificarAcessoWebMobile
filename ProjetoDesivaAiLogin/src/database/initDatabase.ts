import { getDatabase } from './database';

export async function initDatabase() {

    const db = await getDatabase();

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            google_id TEXT UNIQUE NOT NULL,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            foto_url TEXT,
            tipo_login TEXT NOT NULL DEFAULT 'GOOGLE',
            ativo INTEGER NOT NULL DEFAULT 1,
            ultimo_login TEXT,
            criado_em TEXT NOT NULL,
            atualizado_em TEXT NOT NULL
        );
    `);

    console.log('Banco de dados inicializado.');
}