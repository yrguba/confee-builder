import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React from 'react';
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
    useWebSocket();
    useTheme();

    const { clientDomain } = appService.getUrls();

    console.log('client domain: ', clientDomain);

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Modal.Confirm />
                <Notification />
                <Routing />
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
