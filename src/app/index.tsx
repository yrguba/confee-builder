import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { appWindow, WebviewWindow } from '@tauri-apps/api/window';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import 'moment/locale/ru';
import { appService } from 'entities/app';
import Routing from 'pages';
import './index.scss';
import { useTheme, useIdle, useRouter, useStorage, useTimeoutFn, useTimer, useRustServer, usePersister, useEasyState } from 'shared/hooks';
import { Notification } from 'shared/ui';

import { getRandomString } from '../shared/lib';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnReconnect: true,
            retry: 0,
            cacheTime: 1000 * 60 * 24,
            refetchOnWindowFocus: false,
            refetchOnMount: 'always',
        },
    },
});

moment.locale('ru');

function App() {
    const { clientBaseURL, backBaseURL } = appService.getUrls();
    const storage = useStorage();
    const notification = storage.get('notification');
    const { useWebview, rustIsRunning } = useRustServer();
    const webview = useWebview('main');
    const persister = usePersister();

    useEffect(() => {
        if (rustIsRunning) {
            webview.listen('close-requested', () => {
                webview.listenOnce('focus', () => {
                    queryClient.refetchQueries().then();
                });
            });
        }
    }, []);

    useTheme();

    useTimer(30);

    useEffect(() => {
        console.log('clientBaseURL: ', clientBaseURL);
        console.log('backBaseURL: ', backBaseURL);
    }, []);

    const buster = useEasyState('w');

    useEffectOnce(() => {
        setTimeout(() => {
            buster.set(getRandomString(10));
        }, 3000);
        if (appService.tauriIsRunning) {
            // if (!storage.get('max_cache_size')) {
            //     storage.set('max_cache_size', 1);
            // }
        } else {
            document.body.style.maxWidth = '1200px';
            document.body.style.margin = '0 auto';
            document.body.style.borderRight = '2px solid var(--bg-secondary)';
            document.body.style.borderLeft = '2px solid var(--bg-secondary)';
        }
    });
    console.log(buster.value);
    return (
        <BrowserRouter>
            <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
                <Notification options={{ disabledDesktop: !notification }} />
                <Routing />
                <ReactQueryDevtools position="bottom-left" />
            </PersistQueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
