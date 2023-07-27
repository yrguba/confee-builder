import React, { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';

const CompaniesPage = lazy(() => import('./ui'));

const companiesPageRouters = <Route path="/companies" element={<CompaniesPage />} />;

export default companiesPageRouters;
