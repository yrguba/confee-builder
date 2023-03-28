import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import InfoPage from './nested-pages/info';
import UserPage from './ui';

const MessagesPage = lazy(() => import('./nested-pages/messages'));
const FavoritesPage = lazy(() => import('./nested-pages/favorites'));
const TasksPage = lazy(() => import('./nested-pages/tasks'));

const userRouters = (
    <Route path={routing_tree.main.company.user.base} element={<UserPage />}>
        <Route path={routing_tree.main.company.user.messages} element={<MessagesPage />} />
        <Route path={routing_tree.main.company.user.favorites} element={<FavoritesPage />} />
        <Route path={routing_tree.main.company.user.tasks} element={<TasksPage />} />
        <Route path={routing_tree.main.company.user.info.base} element={<InfoPage />}>
            <Route path={routing_tree.main.company.user.info.images} element={<InfoPage />} />
            <Route path={routing_tree.main.company.user.info.videos} element={<InfoPage />} />
            <Route path={routing_tree.main.company.user.info.files} element={<InfoPage />} />
        </Route>
    </Route>
);

export default userRouters;
