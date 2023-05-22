import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { MediaContentFromChatsPage, PrivateChatInfoFromChatsPage, GroupChatInfoFromChatsPage, UsersListFromChatsPage } from 'widgets/chats-page';

import ChatsPage from './ui';

const chatsRouters = (
    <>
        <Route path={routing_tree.main.chats.base} element={<ChatsPage />} />
        <Route path={routing_tree.main.chats.chat.base} element={<ChatsPage />}>
            <Route path={routing_tree.main.chats.chat.private_chat.base} element={<PrivateChatInfoFromChatsPage />}>
                <Route path={routing_tree.main.chats.chat.private_chat.images} element={<MediaContentFromChatsPage />} />
                <Route path={routing_tree.main.chats.chat.private_chat.videos} element={<MediaContentFromChatsPage />} />
                <Route path={routing_tree.main.chats.chat.private_chat.files} element={<MediaContentFromChatsPage />} />
            </Route>
            <Route path={routing_tree.main.chats.chat.group_chat.base} element={<GroupChatInfoFromChatsPage />}>
                <Route path={routing_tree.main.chats.chat.group_chat.users} element={<UsersListFromChatsPage />} />
                <Route path={routing_tree.main.chats.chat.group_chat.images} element={<MediaContentFromChatsPage />} />
                <Route path={routing_tree.main.chats.chat.group_chat.videos} element={<MediaContentFromChatsPage />} />
                <Route path={routing_tree.main.chats.chat.group_chat.files} element={<MediaContentFromChatsPage />} />
            </Route>
        </Route>
    </>
);

export default chatsRouters;
