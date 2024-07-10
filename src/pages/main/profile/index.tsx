import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { Main, Support, Policy, AppSettings, InfoSettings } from './widgets';

const ProfilePage = lazy(() => import('./ui'));

const profilePageRouters = (
    <>
        <Route path="/profile" element={<ProfilePage />}>
            <Route index element={<Main />} />
            <Route path="info_settings" element={<InfoSettings />} />
            <Route path="app_settings" element={<AppSettings />} />
            <Route path="policy" element={<Policy />} />
            <Route path="support" element={<Support />} />
        </Route>
    </>
);

export default profilePageRouters;
