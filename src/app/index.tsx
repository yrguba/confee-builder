import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect } from 'react';
import OneSignal from 'react-onesignal';
import { BrowserRouter } from 'react-router-dom';
import 'moment/locale/ru';

import Routing from 'pages';
import './index.scss';
import { useWebSocket, useTheme } from 'shared/hooks';
import { Notification, Modal } from 'shared/ui';

import { appService } from '../entities/app';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    const { clientBaseURL } = appService.getUrls();
    useTheme();
    useEffect(() => {
        const { onMessage } = useWebSocket();
        onMessage('all', (socketData) => {
            // notification.success({ title: 'test', scope: 'all' });
        });
        console.log('clientBaseURL: ', clientBaseURL);
    }, []);

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Modal.Confirm />
                <Notification />
                <Routing />
                <ReactQueryDevtools position="bottom-left" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
