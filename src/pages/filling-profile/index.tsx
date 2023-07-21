import React from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import FillingProfilePage from './ui';
import Modal from './widgets/modal';
import { FillingProfileStep1, FillingProfileStep2, FillingProfileStep3 } from '../../features/viewer';

const fillingProfilePageRouters = (
    <Route path={routing_tree.fillingProfile.base} element={<FillingProfilePage />}>
        <Route path={routing_tree.fillingProfile.base} element={<Modal />}>
            <Route index element={<FillingProfileStep1 />} />
            <Route path={routing_tree.fillingProfile.step1} element={<FillingProfileStep1 />} />
            <Route path={routing_tree.fillingProfile.step2} element={<FillingProfileStep2 />} />
            <Route path={routing_tree.fillingProfile.step3} element={<FillingProfileStep3 />} />
        </Route>
    </Route>
);

export default fillingProfilePageRouters;
