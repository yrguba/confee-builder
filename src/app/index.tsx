import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'moment/locale/ru';
import { AppGateway } from 'entities/app';
import { Notification } from 'features/app';
import Routing from 'pages';
import './index.scss';
import { firebase, socketIo } from 'shared/configs';
import { useIdle } from 'shared/hooks';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    AppGateway();
    socketIo.on('connect', () => {
        firebase.logEvent(firebase.analytics, 'socket-connect', { name: 'test' });
    });
    socketIo.on('disconnect', () => {
        firebase.logEvent(firebase.analytics, 'socket-disconnect', { name: 'test' });
    });
    const isIdle = useIdle(5000);

    useEffect(() => {
        firebase.logEvent(firebase.analytics, 'start', { name: 'test' });
    }, []);

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
