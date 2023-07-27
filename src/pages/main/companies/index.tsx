import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

import { routing_tree } from 'shared/routing';

const CompaniesPage = lazy(() => import('./ui'));

const companiesPageRouters = <Route path={routing_tree.main.company.base} element={<CompaniesPage />} />;

export default companiesPageRouters;
