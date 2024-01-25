import { AnimatePresence } from 'framer-motion';
import React, { lazy, Fragment } from 'react';
import { Route, useRoutes, Navigate } from 'react-router-dom';

import { MessagesList, MessageInput } from 'features/message';

import Chat from './widgets/chat';
import { Box } from '../../../shared/ui';

const ChatsPage = lazy(() => import('./ui'));

const chatsPageRouters = ['/chats/all', '/chats/personal', '/chats/company/:company_id'].map((path) => (
    <Fragment key={path}>
        <Route path={path} element={<ChatsPage />}>
            <Route path="chat" element={<Chat />}>
                <Route
                    path=":chat_id"
                    element={
                        <AnimatePresence>
                            <MessagesList />
                        </AnimatePresence>
                    }
                />
            </Route>
        </Route>
        <Route path="/chats" element={<Navigate to="/chats/all" replace />} />
    </Fragment>
));
export default chatsPageRouters;
