import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import UsersPage from './ui';

const usersRouters = (
    <>
        <Route path={routing_tree.main.company.department} element={<UsersPage />} />
        <Route path={routing_tree.main.company.division} element={<UsersPage />} />
    </>
);

export default usersRouters;
