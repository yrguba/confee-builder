import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

const MeetPage = lazy(() => import('./ui'));

const meetPageRouters = <Route path="/meet/:meet_id" element={<MeetPage />} />;

export default meetPageRouters;
