import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { ViewerService } from 'entities/viewer';
import { webView } from 'features/auth';
import { SizeWarningPage } from 'pages/warning';
import { useWindowSize } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { TokenService } from 'shared/services';

import fillingProfilePageRouters from './filling-profile';
import mainPageRouters from './main';
import settingsPageRouters from './settings';

function Routing() {
    const { width, height } = useWindowSize();

    const location = useLocation();

    const privateRoutes = (
        <Routes location={location}>
            {mainPageRouters}
            {settingsPageRouters}
            <Route path="*" element={<Navigate to={routing_tree.main.base} replace />} />
        </Routes>
    );

    const fillingProfile = (
        <Routes>
            {fillingProfilePageRouters}
            <Route path="*" element={<Navigate to={routing_tree.fillingProfile.base} replace />} />
        </Routes>
    );

    const getRouting = () => {
        if (width < 480) return <SizeWarningPage size={{ width, height }} error="width" />;
        if (height < 450) return <SizeWarningPage size={{ width, height }} error="height" />;
        if (TokenService.checkAuth()) {
            const viewer = ViewerService.getViewer();
            if (!viewer?.nickname || location.pathname.includes('/filling_profile')) {
                return fillingProfile;
            }
            return privateRoutes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
