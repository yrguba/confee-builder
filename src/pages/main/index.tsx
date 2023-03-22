import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import chatsRouters from './nested-pages/chats';
import companyRouters from './nested-pages/company';
import MainPage from './ui';

const TasksNestedPage = lazy(() => import('./nested-pages/tasks/ui'));

const mainRouters = (
    <Route path={routing_tree.main.base} element={<MainPage />}>
        {companyRouters}
        {chatsRouters}
        <Route path={routing_tree.main.tasks.base} element={<TasksNestedPage />} />
        <Route path={routing_tree.main.base} element={<Navigate to={routing_tree.main.company.base} replace />} />
    </Route>
);

export default mainRouters;
