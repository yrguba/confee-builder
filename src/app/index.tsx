import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WebviewWindow } from '@tauri-apps/api/window';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import 'moment/locale/ru';
import { appService } from 'entities/app';
import Routing from 'pages';
import './index.scss';
import { useTheme, useIdle, useRouter, useStorage, useReverseTimer } from 'shared/hooks';
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

    const isIdle = useIdle(1000 * 60 * 20);

    useUpdateEffect(() => {
        !isIdle && queryClient.refetchQueries();
    }, [isIdle]);

    useTheme();

    useEffect(() => {
        console.log('clientBaseURL: ', clientBaseURL);
    }, []);

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
