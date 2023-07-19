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
        if (basePath === 'main') navigate('/settings');
        if (basePath === 'settings') navigate('/main');
    };

    return <ViewerCardView viewer={data?.data?.data} onClick={switchingRoute} />;
}

export default ViewerCard;
