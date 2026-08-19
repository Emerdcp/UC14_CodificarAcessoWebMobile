import { getDatabase } from './database';

export type Ocorrencia = {
    id: number;
    usuario_id: number;
    latitude: number;
    longitude: number;
    foto_uri: string | null;
    descricao: string | null;
    curtidas: number;
    confirmacoes_resolvido: number;
    status: string;
    criado_em: string;
    atualizado_em: string;
};

export type NovaOcorrencia = {
    usuario_id: number;
    latitude: number;
    longitude: number;
    foto_uri?: string | null;
    descricao?: string | null;
};

export async function cadastrarOcorrencia(
    ocorrencia: NovaOcorrencia
) {

    const db = await getDatabase();

    const agora = new Date().toISOString();

    const resultado = await db.runAsync(
        `
        INSERT INTO ocorrencias (
            usuario_id,
            latitude,
            longitude,
            foto_uri,
            descricao,
            curtidas,
            confirmacoes_resolvido,
            status,
            criado_em,
            atualizado_em
        )
        VALUES (?, ?, ?, ?, ?, 0, 0, 'ABERTA', ?, ?)
        `,
        [
            ocorrencia.usuario_id,
            ocorrencia.latitude,
            ocorrencia.longitude,
            ocorrencia.foto_uri ?? null,
            ocorrencia.descricao ?? null,
            agora,
            agora
        ]
    );

    console.log(
        'Ocorrência cadastrada. ID:',
        resultado.lastInsertRowId
    );

    return resultado.lastInsertRowId;
}

export async function listarOcorrencias(): Promise<Ocorrencia[]> {

    const db = await getDatabase();

    return await db.getAllAsync<Ocorrencia>(
        `
        SELECT
            id,
            usuario_id,
            latitude,
            longitude,
            foto_uri,
            descricao,
            curtidas,
            confirmacoes_resolvido,
            status,
            criado_em,
            atualizado_em
        FROM ocorrencias
        ORDER BY criado_em DESC
        `
    );
}

export async function buscarOcorrenciaPorId(
    id: number
): Promise<Ocorrencia | null> {

    const db = await getDatabase();

    const ocorrencia =
        await db.getFirstAsync<Ocorrencia>(
            `
            SELECT *
            FROM ocorrencias
            WHERE id = ?
            LIMIT 1
            `,
            [id]
        );

    return ocorrencia ?? null;
}

export async function incrementarCurtidas(
    id: number
) {

    const db = await getDatabase();

    await db.runAsync(
        `
        UPDATE ocorrencias
        SET
            curtidas = curtidas + 1,
            atualizado_em = ?
        WHERE id = ?
        `,
        [
            new Date().toISOString(),
            id
        ]
    );
}

export async function incrementarConfirmacoesResolvido(
    id: number
) {

    const db = await getDatabase();

    await db.runAsync(
        `
        UPDATE ocorrencias
        SET
            confirmacoes_resolvido =
                confirmacoes_resolvido + 1,
            atualizado_em = ?
        WHERE id = ?
        `,
        [
            new Date().toISOString(),
            id
        ]
    );

    const ocorrencia =
        await buscarOcorrenciaPorId(id);

    if (
        ocorrencia &&
        ocorrencia.confirmacoes_resolvido >= 3
    ) {

        await marcarComoResolvida(id);
    }
}

export async function marcarComoResolvida(
    id: number
) {

    const db = await getDatabase();

    await db.runAsync(
        `
        UPDATE ocorrencias
        SET
            status = 'RESOLVIDA',
            atualizado_em = ?
        WHERE id = ?
        `,
        [
            new Date().toISOString(),
            id
        ]
    );

    console.log(
        'Ocorrência marcada como resolvida:',
        id
    );
}