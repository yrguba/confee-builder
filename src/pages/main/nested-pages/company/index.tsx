import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import departmentStaffRouters from './nested-pages/department-staff';
import DepartmentPage from './nested-pages/department-staff/ui';
import userRouters from './nested-pages/user';

const CompanyPage = lazy(() => import('./ui'));

const companyRouters = (
    <Route path={routing_tree.main.company.base} element={<CompanyPage />}>
        <Route index element={<DepartmentPage />} />
        {departmentStaffRouters}
        {userRouters}
    </Route>
);

export default companyRouters;
