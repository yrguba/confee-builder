import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { Main, Support, Policy, Settings } from './widgets';

const ProfilePage = lazy(() => import('./ui'));

const profilePageRouters = (
    <>
        <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<Main />} />
            <Route path="settings" element={<Settings />} />
            <Route path="policy" element={<Policy />} />
            <Route path="support" element={<Support />} />
        </Route>
    </>
);

export default profilePageRouters;
