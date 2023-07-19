import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { fillingProfileRouters } from 'widgets/filling-profile-page';

import FillingProfilePage from './ui';

const fillingProfilePageRouters = (
    <Route path={routing_tree.fillingProfile.base} element={<FillingProfilePage />}>
        {fillingProfileRouters}
    </Route>
);

export default fillingProfilePageRouters;
