import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { RoutesNames } from 'shared/enums';

const AuthPage = lazy(() => import('.'));

const authRoutes = <Route path={RoutesNames.auth.base} element={<AuthPage />} />;

export default authRoutes;
