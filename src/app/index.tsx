import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/ru';
import Routing from 'pages';
import { useTheme } from 'shared/hooks';

import './index.scss';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    useTheme();

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
