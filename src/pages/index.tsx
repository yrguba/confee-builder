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
    const { data: viewerData, isLoading, error } = viewerApi.handleGetViewer();

    const routes = (
        <Routes location={location}>
            {mainRoutes}
            {callsPageRouters}
            {initialFillingProfilePageRouters}
            <Route path="*" element={<Navigate to="/chats" replace />} />
        </Routes>
    );

    useEffect(() => {
        if (!isLoading) {
            // if (error) return navigate('/login');
            if (!viewerData?.nickname) return navigate('/filling_profile');
        }
    }, [isLoading]);

    const getRouting = () => {
        if (width < 450) return <SizeWarningPage size={{ width, height }} error="width" />;
        if (height < 470) return <SizeWarningPage size={{ width, height }} error="height" />;
        if (tokensService.checkAuth()) {
            return routes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
