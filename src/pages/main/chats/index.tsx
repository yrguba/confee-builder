import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import ChatsPage from './ui';
import Chat from './widgets/chat';

const chatsPageRouters = (
    <Route path="/chats" element={<ChatsPage />}>
        <Route path="chat/:chat_id" element={<Chat />} />
    </Route>
);

export default chatsPageRouters;
