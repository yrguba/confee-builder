import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import moment from 'moment';
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'moment/locale/ru';

import { appService } from 'entities/app';
import { chatService } from 'entities/chat';
import Routing from 'pages';
import './index.scss';
import { useWebSocket, useTheme } from 'shared/hooks';
import { Notification } from 'shared/ui';

import { notificationsManager } from '../entities/app';
import { viewerService } from '../entities/viewer';
import useVoiceAssistant from '../shared/hooks/useVoiceAssistant';

const queryClient = new QueryClient();
moment.locale('ru');

function App() {
    const { clientBaseURL } = appService.getUrls();
    const notification = Notification.use();
    const viewerId = viewerService?.getId();
    const getOpenChatId = chatService?.getOpenChatId();

    useTheme();

    useEffect(() => {
        const { onMessage } = useWebSocket();
        onMessage('all', (socketData) => {
            notificationsManager(socketData, notification, viewerId, getOpenChatId);
        });
        console.log('clientBaseURL: ', clientBaseURL);
    }, []);

    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Notification />
                <Routing />
                <ReactQueryDevtools position="bottom-left" />
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App;
