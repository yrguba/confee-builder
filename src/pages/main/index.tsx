import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import chatsPageRouters from './chats';
import contactsPageRouters from './contacts';
import MainLayout from './layouts/ui';
import profilePageRouters from './profile';
import tasksPageRouters from './tasks';

const mainRoutes = (
    <>
        <Route path="/" element={<MainLayout />}>
            {contactsPageRouters}
            {chatsPageRouters}
            {tasksPageRouters}
            {profilePageRouters}
        </Route>
        <Route path="*" element={<Navigate to="/chats/all" replace />} />
    </>
);

export default mainRoutes;
