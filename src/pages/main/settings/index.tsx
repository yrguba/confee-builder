import React from 'react';
import { Route } from 'react-router-dom';

import SettingsPage from './ui';

const settingsRouters = <Route path="/settings" element={<SettingsPage />} />;

export default settingsRouters;
