import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { RoutesNames } from 'shared/enums';

import InfoNestedPage from './nested-pages/info';

import MainPage from '.';

const ChatMessagesNestedPage = lazy(() => import('./nested-pages/chat-messages'));
const FavoritesNestedPage = lazy(() => import('./nested-pages/favorites'));
const CalendarNestedPage = lazy(() => import('./nested-pages/calendar'));
const TasksNestedPage = lazy(() => import('./nested-pages/tasks'));

const mainRouters = (
    <Route path={RoutesNames.main.base} element={<MainPage />}>
        <Route index element={<InfoNestedPage />} />
        <Route path={RoutesNames.main.info} element={<InfoNestedPage />} />
        <Route path={RoutesNames.main.chat_messages} element={<ChatMessagesNestedPage />} />
        <Route path={RoutesNames.main.favorites} element={<FavoritesNestedPage />} />
        <Route path={RoutesNames.main.calendar} element={<CalendarNestedPage />} />
        <Route path={RoutesNames.main.tasks} element={<TasksNestedPage />} />
    </Route>
);

export default mainRouters;
