import React from 'react';
import { Route } from 'react-router-dom';

import { RoutesNames } from 'shared/enums';

import AuthPage from './page';

const authRoutes = <Route path={RoutesNames.auth.base} element={<AuthPage />} />;

export default authRoutes;
