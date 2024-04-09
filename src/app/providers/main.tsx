import React, { JSX, useEffect } from 'react';

import { viewerApi, viewerProxy, viewerStore } from 'entities/viewer';

function MainProvider({ children }: { children: JSX.Element }) {
    const { data: viewerData, isFetching, error: viewerError } = viewerApi.handleGetViewer();
    const viewer = viewerStore.use.viewer();
    const session = viewerStore.use.session();

    useEffect(() => {
        const vp = viewerProxy(viewerData?.user);
        if (vp && viewerData?.session) {
            viewer.set(vp);
            session.set(viewerData.session);
        }
    }, [viewerData]);

    return viewer.value ? children : null;
}

export default MainProvider;
