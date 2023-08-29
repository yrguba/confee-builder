import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import Chat from './widgets/chat';

const ChatsPage = lazy(() => import('./ui'));

const chatsPageRouters = (
    <Route path="/chats" element={<ChatsPage />}>
        <Route path="chat/:chat_id" element={<Chat />} />
    </Route>
);

export default chatsPageRouters;
