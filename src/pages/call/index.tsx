import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { PreJoin, CallRoom } from 'features/call';

const CallPage = lazy(() => import('./ui'));
const callPageRouters = (
    <Route path="/call" element={<CallPage />}>
        <Route path="room/:call_data" element={<CallRoom />} />
        <Route path="pre_join/:call_data" element={<PreJoin />} />
    </Route>
);

export default callPageRouters;
