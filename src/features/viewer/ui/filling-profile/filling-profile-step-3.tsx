import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ViewerCardView, useViewerStore, ViewerApi, FillingProfileStep3View } from 'entities/viewer';

function FillingProfileStep3() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useViewerStore.use.socketAction();

    const { data, isLoading } = ViewerApi.handleGetViewer();

    const switchingRoute = () => {
        console.log('click');
    };

    return <FillingProfileStep3View viewer={data?.data?.data} onClick={switchingRoute} />;
}

export default FillingProfileStep3;
