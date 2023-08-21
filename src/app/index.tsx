import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'moment/locale/ru';

import { appService } from 'entities/app';
import Routing from 'pages';
import './index.scss';
import { useWebSocket, useTheme } from 'shared/hooks';
import { Notification, Modal } from 'shared/ui';

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
                {/* <ImagesSwiperModal /> */}
                <Modal.Confirm />
                <Notification />
                <Routing />
                <ReactQueryDevtools position="bottom-left" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
