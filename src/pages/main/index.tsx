import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import chatsPageRouters from './chats';
import contactsPageRouters from './contacts';
import MainLayout from './layouts/ui';
import settingsPageRouters from './settings';
import tasksPageRouters from './tasks';

const mainRoutes = (
    <>
        <Route path="/" element={<MainLayout />}>
            {contactsPageRouters}
            {chatsPageRouters}
            {tasksPageRouters}
            {settingsPageRouters}
        </Route>
        <Route path="*" element={<Navigate to="/chats" replace />} />
    </>
);

export default mainRoutes;
