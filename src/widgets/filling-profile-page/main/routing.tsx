import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { FillingProfileStep1, FillingProfileStep2, FillingProfileStep3 } from 'features/viewer';
import { routing_tree } from 'shared/routing';

import Main from './index';

const fillingProfileRouters = (
    <Route path={routing_tree.fillingProfile.base} element={<Main />}>
        <Route index element={<FillingProfileStep1 />} />
        <Route path={routing_tree.fillingProfile.step1} element={<FillingProfileStep1 />} />
        <Route path={routing_tree.fillingProfile.step2} element={<FillingProfileStep2 />} />
        <Route path={routing_tree.fillingProfile.step3} element={<FillingProfileStep3 />} />
    </Route>
);

export default fillingProfileRouters;
