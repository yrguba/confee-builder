import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { io } from 'socket.io-client';

import Routing from 'pages';
import { useTheme } from 'shared/hooks';

import './index.scss';

const queryClient = new QueryClient();

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
