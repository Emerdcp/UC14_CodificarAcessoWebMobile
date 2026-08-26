import { getDatabase } from './database';

export async function initDatabase() {

    const db = await getDatabase();

    /*
     * =========================================================
     * USUÁRIOS
     * =========================================================
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
     * =========================================================
     * OCORRÊNCIAS
     * =========================================================
     */

    await db.execAsync(`

        CREATE TABLE IF NOT EXISTS ocorrencias (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            usuario_id INTEGER NOT NULL,

            latitude REAL NOT NULL,

            longitude REAL NOT NULL,

            cep TEXT,

            endereco TEXT,

            numero TEXT,

            bairro TEXT,

            complemento TEXT,

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
     * =========================================================
     * VERIFICA COLUNAS EXISTENTES
     * =========================================================
     */

    let colunas =
        await db.getAllAsync<{ name: string }>(
            `PRAGMA table_info(ocorrencias);`
        );


    /*
     * =========================================================
     * CORRIGE "atualizad_em"
     * =========================================================
     */

    const possuiColunaAntiga =
        colunas.some(
            coluna =>
                coluna.name === 'atualizad_em'
        );

    const possuiColunaNova =
        colunas.some(
            coluna =>
                coluna.name === 'atualizado_em'
        );


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


    /*
     * =========================================================
     * ATUALIZA NOVAMENTE AS COLUNAS
     * =========================================================
     */

    colunas =
        await db.getAllAsync<{ name: string }>(
            `PRAGMA table_info(ocorrencias);`
        );


    /*
     * =========================================================
     * CEP
     * =========================================================
     */

    if (
        !colunas.some(
            coluna => coluna.name === 'cep'
        )
    ) {

        await db.execAsync(`

            ALTER TABLE ocorrencias

            ADD COLUMN cep TEXT;

        `);

        console.log(
            'Banco: coluna cep adicionada.'
        );
    }


    /*
     * =========================================================
     * ENDEREÇO
     * =========================================================
     */

    if (
        !colunas.some(
            coluna => coluna.name === 'endereco'
        )
    ) {

        await db.execAsync(`

            ALTER TABLE ocorrencias

            ADD COLUMN endereco TEXT;

        `);

        console.log(
            'Banco: coluna endereco adicionada.'
        );
    }


    /*
     * =========================================================
     * NÚMERO
     * =========================================================
     */

    if (
        !colunas.some(
            coluna => coluna.name === 'numero'
        )
    ) {

        await db.execAsync(`

            ALTER TABLE ocorrencias

            ADD COLUMN numero TEXT;

        `);

        console.log(
            'Banco: coluna numero adicionada.'
        );
    }


    /*
     * =========================================================
     * BAIRRO
     * =========================================================
     */

    if (
        !colunas.some(
            coluna => coluna.name === 'bairro'
        )
    ) {

        await db.execAsync(`

            ALTER TABLE ocorrencias

            ADD COLUMN bairro TEXT;

        `);

        console.log(
            'Banco: coluna bairro adicionada.'
        );
    }


    /*
     * =========================================================
     * COMPLEMENTO
     * =========================================================
     */

    if (
        !colunas.some(
            coluna => coluna.name === 'complemento'
        )
    ) {

        await db.execAsync(`

            ALTER TABLE ocorrencias

            ADD COLUMN complemento TEXT;

        `);

        console.log(
            'Banco: coluna complemento adicionada.'
        );
    }


    console.log(
        'Banco de dados inicializado.'
    );
}