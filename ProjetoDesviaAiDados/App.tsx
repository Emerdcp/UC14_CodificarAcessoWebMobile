import { useEffect, useState } from 'react';

import AppRoutes from '@/navigation/AppRoutes';

import { configurarGoogle } from '@/services/googleAuth';
import { initDatabase } from '@/database/initDatabase';
import { obterSessao } from '@/services/session';

export default function App() {

    const [inicializado, setInicializado] =
        useState(false);

    const [usuarioLogado, setUsuarioLogado] =
        useState(false);

    useEffect(() => {

        async function inicializar() {

            try {

                await initDatabase();

                configurarGoogle();

                const sessao = await obterSessao();

                if (sessao) {

                    console.log(
                        'Sessão encontrada:',
                        sessao.email
                    );

                    setUsuarioLogado(true);

                } else {

                    console.log(
                        'Nenhuma sessão encontrada.'
                    );

                    setUsuarioLogado(false);

                }

            } catch (error) {

                console.error(
                    'Erro ao inicializar aplicação:',
                    error
                );

            } finally {

                setInicializado(true);

            }

        }

        inicializar();

    }, []);

    if (!inicializado) {

        return null;

    }

    return (
        <AppRoutes
            usuarioLogado={usuarioLogado}
        />
    );
}