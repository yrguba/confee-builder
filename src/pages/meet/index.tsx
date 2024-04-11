import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { IncomingCall, MeetRoom, OutGoingCall } from 'features/meet';

const MeetPage = lazy(() => import('./ui'));
const meetPageRouters = (
    <Route path="/meet" element={<MeetPage />}>
        <Route path="room/:meet_id" element={<MeetRoom />} />
        <Route path="incoming_call/:meet_id" element={<IncomingCall />} />
        <Route path="outgoing_call/:meet_id" element={<OutGoingCall />} />
    </Route>
);

export default meetPageRouters;
