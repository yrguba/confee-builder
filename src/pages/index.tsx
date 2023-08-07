import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { viewerApi, tokensService } from 'entities/viewer';
import { webView } from 'features/auth';
import { SizeWarningPage } from 'pages/warning';
import { useWindowSize } from 'shared/hooks';

import callsPageRouters from './calls';
import initialFillingProfilePageRouters from './initial-filling-profile';
import mainRoutes from './main';

function Routing() {
    const { width, height } = useWindowSize();

    const location = useLocation();
    const navigate = useNavigate();
    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();

    const routes = (
        <Routes location={location}>
            {mainRoutes}
            {callsPageRouters}
            {initialFillingProfilePageRouters}
            <Route path="*" element={<Navigate to="/chats" replace />} />
        </Routes>
    );

    useEffect(() => {
        if (!isLoading && !viewerData?.nickname) {
            navigate('/filling_profile');
        }
    }, [isLoading]);

    const getRouting = () => {
        if (width < 400) return <SizeWarningPage size={{ width, height }} error="width" />;
        if (height < 400) return <SizeWarningPage size={{ width, height }} error="height" />;
        if (tokensService.checkAuth()) {
            return routes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
