import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import MessagesPage from './nested-pages/messages';
import CompanyPage from './ui';

const InfoPage = lazy(() => import('./nested-pages/info'));
const FavoritesPage = lazy(() => import('./nested-pages/favorites'));
const TasksNestedPage = lazy(() => import('./nested-pages/tasks'));

const companyRouters = (
    <Route path={routing_tree.main.company.base} element={<CompanyPage />}>
        <Route path={routing_tree.main.company.messages} element={<MessagesPage />} />
        <Route path={routing_tree.main.company.favorites} element={<FavoritesPage />} />
        <Route path={routing_tree.main.company.tasks} element={<TasksNestedPage />} />
        <Route path={routing_tree.main.company.info} element={<InfoPage />} />
        {/* <Route path={routing_tree.main.company.path} element={<Navigate to={routing_tree.main.company.messages} replace />} /> */}
    </Route>
);

export default companyRouters;
