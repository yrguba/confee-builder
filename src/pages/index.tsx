import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { ViewerService } from 'entities/viewer';
import { webView } from 'features/auth';
import { SizeWarningPage } from 'pages/warning';
import { useWindowSize } from 'shared/hooks';
import { TokenService } from 'shared/services';

import chatsPageRouters from './chats';
import ChatsPage from './chats/ui';
import fillingProfilePageRouters from './filling-profile';
import MainLayout from './layouts/main';
import settingsPageRouters from './settings';
import { routing_tree } from '../shared/routing';

function Routing() {
    const { width, height } = useWindowSize();

    const location = useLocation();

    const mainRoutes = (
        <Routes location={location}>
            <Route path="/" element={<MainLayout />}>
                {chatsPageRouters}
                {settingsPageRouters}
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

    const getRouting = () => {
        if (width < 480) return <SizeWarningPage size={{ width, height }} error="width" />;
        if (height < 450) return <SizeWarningPage size={{ width, height }} error="height" />;
        if (TokenService.checkAuth()) {
            const viewer = ViewerService.getViewer();
            // if (!viewer?.nickname || location.pathname.includes('/filling_profile')) {
            return fillingProfileRoutes;
            // }
            // return mainRoutes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
