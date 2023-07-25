import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ViewerCardView, useViewerStore, ViewerApi } from 'entities/viewer';

function ViewerCard() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useViewerStore.use.socketAction();

    const { data, isLoading } = ViewerApi.handleGetViewer();

    const switchingRoute = () => {
        const basePath = pathname.split('/')[1];
        if (basePath !== 'settings') navigate('/settings');
        if (basePath === 'settings') navigate(-1);
    };

    return <ViewerCardView viewer={data?.data?.data} onClick={switchingRoute} />;
}

export default ViewerCard;
