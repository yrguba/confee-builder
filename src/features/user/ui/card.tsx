import React from 'react';

import { UserCardView } from 'entities/user';

import { viewerApi, viewerProxy } from '../../../entities/viewer';

function UserCard() {
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();

    const viewer = viewerProxy(viewerData?.user);

    return (
        <UserCardView
            name={viewer?.full_name || ''}
            birth={viewer?.birth || ''}
            aboutMe=""
            nickname={viewer?.nickname || ''}
            phone={viewer?.phone || ''}
            avatar={viewer?.avatar || ''}
            loading={isLoading}
        />
    );
}

export default UserCard;
