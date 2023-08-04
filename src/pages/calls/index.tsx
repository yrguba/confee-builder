import React, { lazy } from 'react';
import { Route } from 'react-router-dom';

import { GroupAudioCall, GroupVideoCall, PrivateVideoCall, PrivateAudioCall } from 'features/calls';

import CallsPage from './ui';

const callsPageRouters = (
    <Route path="/calls" element={<CallsPage />}>
        <Route path="audio_group/:room_id" element={<GroupAudioCall />} />
        <Route path="audio_private/:room_id" element={<PrivateAudioCall />} />
        <Route path="video_group/:room_id" element={<GroupVideoCall />} />
        <Route path="video_private/:room_id" element={<PrivateVideoCall />} />
    </Route>
);

export default callsPageRouters;
