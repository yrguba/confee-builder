import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import UserPage from './ui';

const MessagesPage = lazy(() => import('./nested-pages/messages'));
const InfoPage = lazy(() => import('./nested-pages/info'));
const FavoritesPage = lazy(() => import('./nested-pages/favorites'));
const TasksNestedPage = lazy(() => import('./nested-pages/tasks'));

const userRouters = (
    <Route path="department/:department_name/division/:division_name/user/:user_id" element={<UserPage />}>
        <Route path={routing_tree.main.company.messages} element={<MessagesPage />} />
        <Route path={routing_tree.main.company.favorites} element={<FavoritesPage />} />
        <Route path={routing_tree.main.company.tasks} element={<TasksNestedPage />} />
        <Route path={routing_tree.main.company.info} element={<InfoPage />} />
    </Route>
);

export default userRouters;
