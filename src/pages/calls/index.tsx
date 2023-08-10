import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { GroupCall, PrivateCall } from 'features/calls';

import CallsPage from './ui';

const callsPageRouters = (
    <Route path="/calls" element={<CallsPage />}>
        <Route path="private/:room_id" element={<PrivateCall />} />
        <Route path="group/:room_id" element={<GroupCall />} />
    </Route>
);

export default callsPageRouters;
