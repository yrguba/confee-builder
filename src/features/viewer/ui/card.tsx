import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ViewerCardView, useViewerStore, viewerApi } from 'entities/viewer';

function ViewerCard() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();

    const switchingRoute = () => {
        const basePath = pathname.split('/')[1];
        if (basePath !== 'settings') navigate('/settings');
        if (basePath === 'settings') navigate(-1);
    };

    return <ViewerCardView viewer={viewerData} onClick={switchingRoute} />;
}

export default ViewerCard;
