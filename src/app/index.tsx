import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/ru';
import { AppGateway } from 'entities/app';
import { Notification } from 'features/app';
import Routing from 'pages';
import './index.scss';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    AppGateway();
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
