import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import SettingsPage from './ui';

const settingsRouters = <Route path={routing_tree.settings.base} element={<SettingsPage />} />;

export default settingsRouters;
