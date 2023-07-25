import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { ImagesListFromUserInfoPage, VideosListFromUserInfoPage, FilesListFromUserInfoPage } from 'widgets/user-info-page';

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
            <Route path={routing_tree.main.company.user.info.images} element={<ImagesListFromUserInfoPage />} />
            <Route path={routing_tree.main.company.user.info.videos} element={<VideosListFromUserInfoPage />} />
            <Route path={routing_tree.main.company.user.info.files} element={<FilesListFromUserInfoPage />} />
        </Route>
    </Route>
);

export default userRouters;
