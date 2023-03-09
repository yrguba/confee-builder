import React from 'react';

import { Card, useViewerStore, viewerApi } from 'entities/viewer';

function ViewerCard() {
    const { data, isLoading } = viewerApi.handleGetViewer();

    return <Card avatar="" name={data?.data?.name || ''} />;
}

export default ViewerCard;
