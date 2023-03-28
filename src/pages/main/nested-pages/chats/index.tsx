import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { UserRightSidebarChatsPage } from 'widgets/chats-page';

const ChatsPage = lazy(() => import('./ui'));

const chatsRouters = (
    <Route path={`${routing_tree.main.chats.base}`} element={<ChatsPage />}>
        <Route path="chat/:chat_id" element={<ChatsPage />}>
            <Route path="private_chat/:user_id" element={<ChatsPage />} />
            <Route path="group_chat/:chat_id" element={<ChatsPage />} />
        </Route>
    </Route>
);

export default chatsRouters;
