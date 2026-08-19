import { getDatabase } from './database';


/*
 * =========================================================
 * TIPO DA OCORRÊNCIA
 * =========================================================
 */

export interface Ocorrencia {

    id: number;

    usuario_id: number;

    latitude: number;

    longitude: number;

    cep: string | null;

    endereco: string | null;

    numero: string | null;

    bairro: string | null;

    complemento: string | null;

    foto_uri: string | null;

    descricao: string | null;

    curtidas: number;

    confirmacoes_resolvido: number;

    status: string;

    criado_em: string;

    atualizado_em: string;
}


/*
 * =========================================================
 * DADOS PARA CADASTRAR
 * =========================================================
 */

export interface NovaOcorrencia {

    usuario_id: number;

    latitude: number;

    longitude: number;

    cep?: string;

    endereco?: string;

    numero?: string;

    bairro?: string;

    complemento?: string;

    foto_uri?: string;

    descricao?: string;
}


/*
 * =========================================================
 * CADASTRAR OCORRÊNCIA
 * =========================================================
 */

export async function cadastrarOcorrencia(
    dados: NovaOcorrencia
) {

    const db =
        await getDatabase();

    const agora =
        new Date().toISOString();


    const resultado =
        await db.runAsync(

            `
            INSERT INTO ocorrencias (

                usuario_id,

                latitude,

                longitude,

                cep,

                endereco,

                numero,

                bairro,

                complemento,

                foto_uri,

                descricao,

                curtidas,

                confirmacoes_resolvido,

                status,

                criado_em,

                atualizado_em

            )

            VALUES (

                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                0,
                0,
                'ABERTA',
                ?,
                ?

            );
            `,

            dados.usuario_id,

            dados.latitude,

            dados.longitude,

            dados.cep ?? null,

            dados.endereco ?? null,

            dados.numero ?? null,

            dados.bairro ?? null,

            dados.complemento ?? null,

            dados.foto_uri ?? null,

            dados.descricao ?? null,

            agora,

            agora
        );


    console.log(
        'Ocorrência cadastrada. ID:',
        resultado.lastInsertRowId
    );


    return resultado.lastInsertRowId;
}


/*
 * =========================================================
 * LISTAR OCORRÊNCIAS
 * =========================================================
 */

export async function listarOcorrencias(): Promise<Ocorrencia[]> {

    const db =
        await getDatabase();


    const ocorrencias =
        await db.getAllAsync<Ocorrencia>(

            `
            SELECT

                id,

                usuario_id,

                latitude,

                longitude,

                cep,

                endereco,

                numero,

                bairro,

                complemento,

                foto_uri,

                descricao,

                curtidas,

                confirmacoes_resolvido,

                status,

                criado_em,

                atualizado_em

            FROM ocorrencias

            ORDER BY id DESC;
            `
        );


    return ocorrencias;
}


/*
 * =========================================================
 * BUSCAR OCORRÊNCIA POR ID
 * =========================================================
 */

export async function buscarOcorrenciaPorId(
    id: number
): Promise<Ocorrencia | null> {

    const db =
        await getDatabase();


    const ocorrencias =
        await db.getAllAsync<Ocorrencia>(

            `
            SELECT

                id,

                usuario_id,

                latitude,

                longitude,

                cep,

                endereco,

                numero,

                bairro,

                complemento,

                foto_uri,

                descricao,

                curtidas,

                confirmacoes_resolvido,

                status,

                criado_em,

                atualizado_em

            FROM ocorrencias

            WHERE id = ?

            LIMIT 1;
            `,

            id
        );


    if (
        ocorrencias.length === 0
    ) {

        return null;
    }


    return ocorrencias[0];
}


/*
 * =========================================================
 * INCREMENTAR CURTIDAS
 * =========================================================
 */

export async function incrementarCurtidas(
    ocorrenciaId: number
) {

    const db =
        await getDatabase();

    const agora =
        new Date().toISOString();


    await db.runAsync(

        `
        UPDATE ocorrencias

        SET

            curtidas =
                curtidas + 1,

            atualizado_em = ?

        WHERE id = ?;
        `,

        agora,

        ocorrenciaId
    );
}


/*
 * =========================================================
 * CONFIRMAR PROBLEMA RESOLVIDO
 * =========================================================
 */

export async function incrementarConfirmacoesResolvido(
    ocorrenciaId: number
) {

    const db =
        await getDatabase();

    const agora =
        new Date().toISOString();


    /*
     * Primeiro incrementa a confirmação.
     */

    await db.runAsync(

        `
        UPDATE ocorrencias

        SET

            confirmacoes_resolvido =
                confirmacoes_resolvido + 1,

            atualizado_em = ?

        WHERE id = ?;
        `,

        agora,

        ocorrenciaId
    );


    /*
     * Busca a ocorrência atualizada.
     */

    const ocorrencia =
        await buscarOcorrenciaPorId(
            ocorrenciaId
        );


    if (!ocorrencia) {
        return;
    }


    /*
     * Se atingir 3 confirmações,
     * a ocorrência passa para RESOLVIDA.
     */

    if (
        ocorrencia.confirmacoes_resolvido >= 3 &&
        ocorrencia.status !== 'RESOLVIDA'
    ) {

        await db.runAsync(

            `
            UPDATE ocorrencias

            SET

                status = 'RESOLVIDA',

                atualizado_em = ?

            WHERE id = ?;
            `,

            agora,

            ocorrenciaId
        );

    }
}