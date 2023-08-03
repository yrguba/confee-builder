import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import chatsPageRouters from './chats';
import companiesPageRouters from './companies';
import MainLayout from './layouts/ui';
import settingsPageRouters from './settings';
import tasksPageRouters from './tasks';

const mainRoutes = (
    <>
        <Route path="/" element={<MainLayout />}>
            {chatsPageRouters}
            {settingsPageRouters}
            {tasksPageRouters}
            {companiesPageRouters}
        </Route>
        <Route path="*" element={<Navigate to="/chats" replace />} />
    </>
);

export default mainRoutes;
