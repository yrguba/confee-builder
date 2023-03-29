import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import departmentStaffRouters from './nested-pages/department-staff';
import DepartmentStaffPage from './nested-pages/department-staff/ui';
import userRouters from './nested-pages/user';

const DepartmentPage = lazy(() => import('./ui'));

const departmentRouters = (
    <Route path={routing_tree.main.company.base} element={<DepartmentPage />}>
        <Route index element={<DepartmentStaffPage />} />
        {departmentStaffRouters}
        {userRouters}
    </Route>
);

export default departmentRouters;
