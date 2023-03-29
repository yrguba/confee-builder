import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import DepartmentPage from './ui';

const departmentStaffRouters = (
    <>
        <Route path={routing_tree.main.company.department} element={<DepartmentPage />} />
        <Route path={routing_tree.main.company.division} element={<DepartmentPage />} />
    </>
);

export default departmentStaffRouters;
