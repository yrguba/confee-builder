import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { PreJoin, MeetRoom } from 'features/meet';

const MeetPage = lazy(() => import('./ui'));
const meetPageRouters = (
    <Route path="/meet" element={<MeetPage />}>
        <Route path="room/:meet_data" element={<MeetRoom />} />
        <Route path="pre_join/:meet_data" element={<PreJoin />} />
    </Route>
);

export default meetPageRouters;
