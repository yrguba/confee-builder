import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { ImagesListFromChatsPage, PrivateChatInfoFromChatsPage } from 'widgets/chats-page';

import ChatsPage from './ui';

const chatsRouters = (
    <>
        <Route path={routing_tree.main.chats.base} element={<ChatsPage />} />
        <Route path={routing_tree.main.chats.chat.base} element={<ChatsPage />}>
            <Route path={routing_tree.main.chats.chat.private_chat.base} element={<PrivateChatInfoFromChatsPage />}>
                <Route path={routing_tree.main.chats.chat.private_chat.images} element={<ImagesListFromChatsPage />} />
            </Route>
        </Route>
    </>
);

export default chatsRouters;
