import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import chatsPageRouters from './chats';
import companiesPageRouters from './companies';
import MainLayout from './layouts/ui';
import settingsPageRouters from './settings';
import tasksPageRouters from './tasks';

const mainRoutes = (
    <Routes location={window.location}>
        <Route path="/" element={<MainLayout />}>
            {chatsPageRouters}
            {settingsPageRouters}
            {tasksPageRouters}
            {companiesPageRouters}
        </Route>
        <Route path="*" element={<Navigate to="/chats" replace />} />
    </Routes>
);

export default mainRoutes;
