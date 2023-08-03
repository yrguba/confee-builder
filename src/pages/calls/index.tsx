import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { GroupAudioCall, GroupVideoCall, PrivateVideoCall, PrivateAudioCall } from 'features/calls';

const CallsPage = lazy(() => import('./ui'));

const callsPageRouters = (
    <Route path="/calls" element={<CallsPage />}>
        <Route path="audio_group" element={<GroupAudioCall />} />
        <Route path="audio_private" element={<PrivateAudioCall />} />
        <Route path="video_group" element={<GroupVideoCall />} />
        <Route path="video_private" element={<PrivateVideoCall />} />
    </Route>
);

export default callsPageRouters;
