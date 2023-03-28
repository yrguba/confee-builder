import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import ChatsPage from './ui';

const chatsRouters = (
    <Route path={routing_tree.main.chats.base} element={<ChatsPage />}>
        <Route path={routing_tree.main.chats.chat.base} element={<ChatsPage />} />
        <Route path={routing_tree.main.chats.chat.group_chat.base} element={<ChatsPage />}>
            <Route path={routing_tree.main.chats.chat.group_chat.users} element={<ChatsPage />} />
            <Route path={routing_tree.main.chats.chat.group_chat.images} element={<ChatsPage />} />
            <Route path={routing_tree.main.chats.chat.group_chat.videos} element={<ChatsPage />} />
            <Route path={routing_tree.main.chats.chat.group_chat.files} element={<ChatsPage />} />
        </Route>
        <Route path={routing_tree.main.chats.chat.private_chat.base} element={<ChatsPage />}>
            <Route path={routing_tree.main.chats.chat.private_chat.images} element={<ChatsPage />} />
            <Route path={routing_tree.main.chats.chat.private_chat.videos} element={<ChatsPage />} />
            <Route path={routing_tree.main.chats.chat.private_chat.files} element={<ChatsPage />} />
        </Route>
    </Route>
);

export default chatsRouters;
