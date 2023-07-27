import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/ru';
import { AppGateway, appObserver } from 'entities/app';
import { Notification } from 'features/app';
import Routing from 'pages';
import './index.scss';
import { firebase } from 'shared/configs';
import { useIdle, useWebSocket } from 'shared/hooks';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    useWebSocket();
    AppGateway();
    appObserver();

    const isIdle = useIdle(5000);

    console.log(window.location.origin);

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
