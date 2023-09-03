import React, { lazy, Fragment } from 'react';
import { Route, useRoutes, Navigate } from 'react-router-dom';

import Chat from './widgets/chat';

const ChatsPage = lazy(() => import('./ui'));

const chatsPageRouters = ['/chats/all', '/chats/personal', '/chats/company'].map((path) => (
    <Fragment key={path}>
        <Route key={path} path={path} element={<ChatsPage />}>
            <Route path="chat/:chat_id" element={<Chat />} />
        </Route>
        <Route key={`${path}111`} path="/chats" element={<Navigate to="/chats/all" replace />} />
    </Fragment>
));
export default chatsPageRouters;
