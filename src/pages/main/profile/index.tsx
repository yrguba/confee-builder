import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const ProfilePage = lazy(() => import('./ui'));

const profilePageRouters = <Route path="/settings" element={<ProfilePage />} />;

export default profilePageRouters;
