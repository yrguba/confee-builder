import React from 'react';
import { Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

import AuthPage from './ui';

const authRoutes = <Route path={routing_tree.auth.base} element={<AuthPage />} />;

export default authRoutes;
