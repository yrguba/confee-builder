import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import Join from './ui/join';
import Room from './ui/room';

const MeetPage = lazy(() => import('./ui'));
const meetPageRouters = (
    <Route path="/meet" element={<MeetPage />}>
        <Route path="room/:meet_id" element={<Room />} />
        <Route path="join" element={<Join />} />
    </Route>
);

export default meetPageRouters;
