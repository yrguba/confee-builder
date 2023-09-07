import React from 'react';

import { UserCardView } from 'entities/user';
import { viewerApi, viewerProxy, ViewerProfileView } from 'entities/viewer';
import { useRouter } from 'shared/hooks';

function ViewerCard() {
    const { navigate } = useRouter();
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();

    const viewer = viewerProxy(viewerData?.user);
    navigate('info_settings');
    return (
        <ViewerProfileView
            viewer={viewer}
            clickSettings={() => navigate('info_settings')}
            companies={viewerData?.companies}
            departments={viewerData?.companies?.length ? viewerData?.companies[0]?.departments : []}
        />
    );
}

export default ViewerCard;
