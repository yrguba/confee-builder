import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import UpdateAppPage from './ui';

const CallsPage = lazy(() => import('./ui'));

const updateAppPageRouters = <Route path="/update" element={<UpdateAppPage />} />;

export default updateAppPageRouters;
