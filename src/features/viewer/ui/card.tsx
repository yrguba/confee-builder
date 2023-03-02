import React from 'react';

import { ViewerCard, useViewerStore, viewerApi } from 'entities/viewer';

function ViewerCardFeature() {
    const { data, isLoading } = viewerApi.handleGetViewer();
    console.log('data', data?.data?.name);

    return <ViewerCard />;
}

export default ViewerCardFeature;
