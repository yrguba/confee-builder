import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { appWindow, WebviewWindow } from '@tauri-apps/api/window';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import 'moment/locale/ru';
import { appService } from 'entities/app';
import Routing from 'pages';
import './index.scss';
import { useTheme, useIdle, useRouter, useStorage, useTimeoutFn, useTimer } from 'shared/hooks';
import { Notification } from 'shared/ui';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});

moment.locale('ru');

function App() {
    const { clientBaseURL } = appService.getUrls();
    const storage = useStorage();
    const notification = storage.get('notification');

    useEffect(() => {
        if (appService.tauriIsRunning) {
            appWindow.listen('tauri://close-requested', (e) => {
                appWindow.once('tauri://focus', (e) => {
                    queryClient.refetchQueries().then();
                });
            });
        }
    }, []);

    useTheme();

    useTimer(30);

    useEffect(() => {
        console.log('clientBaseURL: ', clientBaseURL);
    }, []);

    useEffectOnce(() => {
        if (appService.tauriIsRunning) {
            // if (!storage.get('max_cache_size')) {
            //     storage.set('max_cache_size', 1);
            // }
        } else {
            document.body.style.maxWidth = '1200px';
            document.body.style.margin = '0 auto';
        }
    });

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Notification options={{ disabledDesktop: !notification }} />
                <Routing />
                <ReactQueryDevtools position="bottom-left" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
