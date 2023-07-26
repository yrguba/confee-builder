import React from 'react';
import { Route } from 'react-router-dom';

import { InitialFillingProfileStep1, InitialFillingProfileStep2, InitialFillingProfileStep3 } from 'features/viewer';
import { routing_tree } from 'shared/routing';

import FillingProfilePage from './ui';
import Modal from './widgets/modal';

const initialFillingProfilePageRouters = (
    <Route path="/filling_profile" element={<FillingProfilePage />}>
        <Route path="" element={<Modal />}>
            <Route index element={<InitialFillingProfileStep1 />} />
            <Route path="step1" element={<InitialFillingProfileStep1 />} />
            <Route path="step2" element={<InitialFillingProfileStep2 />} />
            <Route path="step3" element={<InitialFillingProfileStep3 />} />
        </Route>
    </Route>
);

export default initialFillingProfilePageRouters;
