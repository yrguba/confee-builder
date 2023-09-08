import React from 'react';

import { viewerApi, viewerProxy, ViewerProfileView } from 'entities/viewer';
import { useRouter } from 'shared/hooks';

import { UserAvatarsSwiper } from '../../user';

function ViewerCard() {
    const { navigate } = useRouter();
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();

    const viewer = viewerProxy(viewerData?.user);

    return (
        <>
            {viewerData?.user && <UserAvatarsSwiper userId={viewerData?.user.id} />}
            <ViewerProfileView
                viewer={viewer}
                clickSettings={() => navigate('info_settings')}
                companies={viewerData?.companies}
                departments={viewerData?.companies?.length ? viewerData?.companies[0]?.departments : []}
            />
        </>
    );
}

export default ViewerCard;
