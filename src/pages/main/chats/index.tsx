import React, { lazy, Fragment } from 'react';
import { Route, useRoutes, Navigate } from 'react-router-dom';

import Chat from './widgets/chat';

const ChatsPage = lazy(() => import('./ui'));

const chatsPageRouters = ['/chats/all', '/chats/personal', '/chats/company/:company_id'].map((path) => (
    <Fragment key={path}>
        <Route path={path} element={<ChatsPage />}>
            <Route path="chat/:chat_id" element={<Chat />} />
        </Route>
        <Route path="/chats" element={<Navigate to="/chats/all" replace />} />
    </Fragment>
));
export default chatsPageRouters;
