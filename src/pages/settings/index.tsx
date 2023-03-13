import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import ProfilePage from './nested-pages/profile/ui';
import SettingsPage from './ui';

const PrivacyPage = lazy(() => import('./nested-pages/privacy/ui'));

const settingsRouters = (
    <Route path={routing_tree.settings.base} element={<SettingsPage />}>
        <Route path={routing_tree.settings.profile} element={<ProfilePage />} />
        <Route path={routing_tree.settings.privacy} element={<PrivacyPage />} />
    </Route>
);

export default settingsRouters;
