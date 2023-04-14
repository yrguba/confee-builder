import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/ru';
import { appObserver } from 'entities/app';
import Routing from 'pages';

import './index.scss';
import { Notification } from '../features/app';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    appObserver();

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routing />
                <Notification />
                <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
