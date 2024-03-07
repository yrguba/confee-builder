import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffectOnce } from 'react-use';

import 'moment/locale/ru';
import { appService } from 'entities/app';
import Routing from 'pages';
import './index.scss';
import { useTheme, useStorage, useTimer, useRustServer, usePersister } from 'shared/hooks';
import { Notification } from 'shared/ui';

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
    const storage = useStorage();
    const notification = storage.get('notification');
    const { useWebview, rustIsRunning } = useRustServer();
    const webview = useWebview('main');
    const persister = usePersister(queryClient);

    // useEffect(() => {
    //     if (rustIsRunning) {
    //         webview.listen('close-requested', () => {
    //             webview.listenOnce('focus', () => {
    //                 queryClient.refetchQueries().then();
    //             });
    //         });
    //     }
    // }, []);

    useTheme();

    useTimer(30);

    useEffect(() => {
        console.log('clientBaseURL: ', clientBaseURL);
        console.log('backBaseURL: ', backBaseURL);
    }, []);

    useEffectOnce(() => {
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
