import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import DepartmentPage from './nested-pages/department-staff';
import userRouters from './nested-pages/user';
import CompanyPage from './ui';

const companyRouters = (
    <Route path={routing_tree.main.company.base} element={<CompanyPage />}>
        <Route index element={<DepartmentPage />} />
        <Route path={`${routing_tree.main.company.department}/:department_name/`} element={<DepartmentPage />}>
            <Route path={`${routing_tree.main.company.division}/:division_name`} element={<DepartmentPage />} />
        </Route>
        {userRouters}
    </Route>
);

export default companyRouters;
