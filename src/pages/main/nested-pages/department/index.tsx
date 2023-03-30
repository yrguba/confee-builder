import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import userRouters from './nested-pages/user';
import usersRouters from './nested-pages/users';
import UsersPage from './nested-pages/users/ui';

const DepartmentPage = lazy(() => import('./ui'));

const departmentRouters = (
    <Route path={routing_tree.main.company.base} element={<DepartmentPage />}>
        <Route index element={<UsersPage />} />
        {usersRouters}
        {userRouters}
    </Route>
);

export default departmentRouters;
