import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const SettingsPage = lazy(() => import('./ui'));

const settingsRouters = <Route path="/settings" element={<SettingsPage />} />;

export default settingsRouters;
