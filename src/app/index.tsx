import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';

import 'moment/locale/ru';
import { appService } from 'entities/app';
import Routing from 'pages';
import './index.scss';
import { useTheme, useIdle, useRouter, useStorage } from 'shared/hooks';
import { Notification } from 'shared/ui';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    const { clientBaseURL } = appService.getUrls();
    const storage = useStorage();
    const notification_scope = storage.get('notification_scope');

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
                <Notification options={{ disabledDesktop: !notification_scope }} />
                <Routing />
                <ReactQueryDevtools position="bottom-left" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
