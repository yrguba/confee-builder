import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffectOnce } from 'react-use';
import utf8 from 'utf8';
import 'moment/locale/ru';

import { appService, appStore } from 'entities/app';
import Routing from 'pages';
import './index.scss';
import { useTheme, useStorage, useTimer, useRustServer, usePersister } from 'shared/hooks';
import { Button, Notification } from 'shared/ui';

import Provider from './provider';
import MeetProvider from './providers/call';
import CallProvider from './providers/call';
import MainProvider from './providers/main';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            retry: 0,
            cacheTime: 1000 * 60 * 24,
            refetchOnWindowFocus: false,
        },
    },
});

moment.locale('ru');

function App() {
    const { clientBaseURL, backBaseURL } = appService.getUrls();

    const persister = usePersister(queryClient);

    useTheme();

    useTimer(30);

    useEffect(() => {
        console.log('clientBaseURL: ', clientBaseURL);
        console.log('backBaseURL: ', backBaseURL);
    }, []);

    useEffectOnce(() => {
        window.addEventListener('dragover', (e) => e.preventDefault(), false);
        window.addEventListener('drop', (e) => e.preventDefault(), false);

        if (appService.tauriIsRunning) {
        } else {
            document.body.style.maxWidth = '1200px';
            document.body.style.margin = '0 auto';
            document.body.style.borderRight = '2px solid var(--bg-secondary)';
            document.body.style.borderLeft = '2px solid var(--bg-secondary)';
        }
    });

    return (
        <BrowserRouter>
            <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
                <MainProvider>
                    <CallProvider>
                        <Provider>
                            <Notification options={{ disabledDesktop: true }} />
                            <Routing />
                            <ReactQueryDevtools position="bottom-left" />
                        </Provider>
                    </CallProvider>
                </MainProvider>
            </PersistQueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
