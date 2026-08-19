import { getDatabase } from './database';

export async function initDatabase() {

    const db = await getDatabase();

    /*
     * Cria a tabela de usuários
     */
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

    /*
     * Cria a tabela de ocorrências
     */
    await db.execAsync(`

        CREATE TABLE IF NOT EXISTS ocorrencias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            foto_uri TEXT,
            descricao TEXT,
            curtidas INTEGER NOT NULL DEFAULT 0,
            confirmacoes_resolvido INTEGER NOT NULL DEFAULT 0,
            status TEXT NOT NULL DEFAULT 'ABERTA',
            criado_em TEXT NOT NULL,
            atualizado_em TEXT NOT NULL,
            FOREIGN KEY (usuario_id)
                REFERENCES usuarios(id)
        );

    `);

    /*
     * Verifica se a versão antiga da tabela possui
     * o campo escrito incorretamente: atualizad_em
     */
    const colunas =
        await db.getAllAsync<{ name: string }>(
            `PRAGMA table_info(ocorrencias);`
        );

    const possuiColunaAntiga =
        colunas.some(
            coluna => coluna.name === 'atualizad_em'
        );

    const possuiColunaNova =
        colunas.some(
            coluna => coluna.name === 'atualizado_em'
        );

    /*
     * Corrige o nome da coluna antiga.
     */
    if (
        possuiColunaAntiga &&
        !possuiColunaNova
    ) {

        await db.execAsync(`
            ALTER TABLE ocorrencias
            RENAME COLUMN atualizad_em
            TO atualizado_em;
        `);

        console.log(
            'Banco: coluna atualizado_em corrigida.'
        );
    }

    console.log(
        'Banco de dados inicializado.'
    );
}