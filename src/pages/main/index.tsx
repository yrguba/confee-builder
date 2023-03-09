import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import companyRouters from './nested-pages/company';
import MainPage from './ui';

const ChatsNestedPage = lazy(() => import('./nested-pages/chats/ui'));
const TasksNestedPage = lazy(() => import('./nested-pages/tasks/ui'));

const mainRouters = (
    <Route path={routing_tree.main.base} element={<MainPage />}>
        {companyRouters}
        <Route path={routing_tree.main.chats.base} element={<ChatsNestedPage />} />
        <Route path={routing_tree.main.tasks.base} element={<TasksNestedPage />} />
    </Route>
);

export default mainRouters;
