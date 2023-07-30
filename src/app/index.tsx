import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/ru';

import Routing from 'pages';
import './index.scss';
import { useWebSocket } from 'shared/hooks';

import { AppService } from '../entities/app';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    useWebSocket();

    const { clientDomain } = AppService.getUrls();

    console.log('client domain: ', clientDomain);

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routing />
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
