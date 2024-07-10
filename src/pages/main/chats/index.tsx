import React, { lazy, Fragment } from 'react';
import { Route, Navigate } from 'react-router-dom';

import { ChatGpt } from 'features/chat';
import { MessagesList } from 'features/message';

import Chat from './widgets/chat';

const ChatsPage = lazy(() => import('./ui'));

const chatsPageRouters = ['/chats/all', '/chats/personal', '/chats/company/:company_id'].map((path) => (
    <Fragment key={path}>
        <Route path={path} element={<ChatsPage />}>
            <Route path="chat" element={<Chat />}>
                <Route path=":chat_id" element={<MessagesList />} />
            </Route>
            <Route path="chat_gpt" element={<ChatGpt />} />
        </Route>
        <Route path="/chats" element={<Navigate to="/chats/all" replace />} />
    </Fragment>
));
export default chatsPageRouters;
