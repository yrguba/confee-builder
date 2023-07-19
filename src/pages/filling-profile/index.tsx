import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import FillingProfilePage from './ui';

const fillingProfileRouters = (
    <Route path={routing_tree.fillingProfile.base} element={<FillingProfilePage />}>
        <Route index element={<div>step1</div>} />
        <Route path={routing_tree.fillingProfile.step1} element={<div>step1</div>} />
        <Route path={routing_tree.fillingProfile.step2} element={<div>step2</div>} />
        <Route path={routing_tree.fillingProfile.step3} element={<div>step3</div>} />
    </Route>
);

export default fillingProfileRouters;
