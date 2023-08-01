import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/ru';

import Routing from 'pages';
import './index.scss';
import { useWebSocket } from 'shared/hooks';

import { appService } from '../entities/app';
import { Notifications } from '../features/app';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    useWebSocket();

    const { clientDomain } = appService.getUrls();

    console.log('client domain: ', clientDomain);

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Notifications />
                <Routing />
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
