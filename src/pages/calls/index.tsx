import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const CallsPage = lazy(() => import('./ui'));

const callsPageRouters = <Route path="/calls" element={<CallsPage />} />;

export default callsPageRouters;
