import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import chatsRouters from './nested-pages/chats';
import departmentRouters from './nested-pages/department';
import tasksRouters from './nested-pages/tasks';
import MainPage from './ui';

const mainRouters = (
    <Route path={routing_tree.main.base} element={<MainPage />}>
        {departmentRouters}
        {chatsRouters}
        {tasksRouters}
        <Route path={routing_tree.main.base} element={<Navigate to={routing_tree.main.chats.base} replace />} />
    </Route>
);

export default mainRouters;
