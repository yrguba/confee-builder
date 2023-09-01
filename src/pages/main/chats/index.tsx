import React, { lazy } from 'react';
import { Route, useRoutes } from 'react-router-dom';

import Chat from './widgets/chat';

const ChatsPage = lazy(() => import('./ui'));

const chatsPageRouters = ['/chats/all', '/chats/personal', '/chats/company'].map((path) => (
    <Route key={path} path={path} element={<ChatsPage />}>
        <Route path="chat/:chat_id" element={<Chat />} />
    </Route>
));
export default chatsPageRouters;
