import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { ViewerApi, ViewerService } from 'entities/viewer';
import { webView } from 'features/auth';
import { SizeWarningPage } from 'pages/warning';
import { useWindowSize } from 'shared/hooks';
import { TokenService } from 'shared/services';

import chatsPageRouters from './chats';
import ChatsPage from './chats/ui';
import fillingProfilePageRouters from './filling-profile';
import MainLayout from './layouts/main';
import settingsPageRouters from './settings';
import tasksPageRouters from './tasks';
import { routing_tree } from '../shared/routing';

function Routing() {
    const { width, height } = useWindowSize();

    const location = useLocation();
    const navigate = useNavigate();
    const { data: viewerData, isLoading } = ViewerApi.handleGetViewer();

    const mainRoutes = (
        <Routes location={location}>
            <Route path="/" element={<MainLayout />}>
                {chatsPageRouters}
                {settingsPageRouters}
                {tasksPageRouters}
            </Route>
            <Route path="*" element={<Navigate to="/chats" replace />} />
        </Routes>
    );

    const fillingProfileRoutes = (
        <Routes>
            {fillingProfilePageRouters}
            <Route path="*" element={<Navigate to="/filling_profile" replace />} />
        </Routes>
    );

    useEffect(() => {
        if (!isLoading && !viewerData?.data?.data?.nickname) {
            navigate('/filling_profile');
        }
    }, [isLoading]);

    const getRouting = () => {
        if (width < 480) return <SizeWarningPage size={{ width, height }} error="width" />;
        if (height < 450) return <SizeWarningPage size={{ width, height }} error="height" />;
        if (TokenService.checkAuth()) {
            if (location.pathname.includes('/filling_profile')) {
                return fillingProfileRoutes;
            }

            return mainRoutes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
