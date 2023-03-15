import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import userRouters from './nested-pages/user';
import UsersPage from './nested-pages/users';
import CompanyPage from './ui';

const companyRouters = (
    <Route path={routing_tree.main.company.base} element={<CompanyPage />}>
        <Route index element={<UsersPage />} />
        <Route path={`${routing_tree.main.company.department}/:department_name/`} element={<UsersPage />}>
            <Route path={`${routing_tree.main.company.division}/:division_name`} element={<UsersPage />} />
        </Route>
        {userRouters}
    </Route>
);

export default companyRouters;
