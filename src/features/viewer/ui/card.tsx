import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Card, useViewerStore, viewerApi } from 'entities/viewer';

function ViewerCard() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // const { data, isLoading } = viewerApi.handleGetViewer();

    const switchingRoute = () => {
        const basePath = pathname.split('/')[1];
        if (basePath === 'main') navigate('/settings');
        if (basePath === 'settings') navigate('/info');
    };

    // return <Card avatar="" name={data?.data?.name || ''} onClick={switchingRoute} />;
    return <Card avatar="" name="" onClick={switchingRoute} />;
}

export default ViewerCard;
