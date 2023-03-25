import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import InfoPage from './nested-pages/info';
import UserPage from './ui';

const MessagesPage = lazy(() => import('./nested-pages/messages'));
const FavoritesPage = lazy(() => import('./nested-pages/favorites'));
const TasksPage = lazy(() => import('./nested-pages/tasks'));

const userRouters = (
    <Route path="department/:department_name/division/:division_name/user/:user_id/name/:user_name" element={<UserPage />}>
        <Route path={routing_tree.main.company.messages} element={<MessagesPage />} />
        <Route path={routing_tree.main.company.favorites} element={<FavoritesPage />} />
        <Route path={routing_tree.main.company.tasks} element={<TasksPage />} />
        <Route path={routing_tree.main.company.info} element={<InfoPage />} />
    </Route>
);

export default userRouters;
