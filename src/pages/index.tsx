import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { webView } from 'features/auth';
import { SizeWarningPage } from 'pages/warning';
import { useWindowSize } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { TokenService } from 'shared/services';

import authRoutes from './auth';
import mainRouters from './main';
import settingsRouters from './settings';

function Routing() {
    const { width, height } = useWindowSize();

    const location = useLocation();

    const privateRoutes = (
        <Routes location={location}>
            {mainRouters}
            {settingsRouters}
            <Route path="*" element={<Navigate to={routing_tree.main.base} replace />} />
        </Routes>
    );

    const publicRoutes = (
        <Routes>
            {authRoutes}
            <Route path="*" element={<Navigate to={routing_tree.auth.base} replace />} />
        </Routes>
    );

    const getRouting = () => {
        if (width < 480) return <SizeWarningPage size={{ width, height }} error="width" />;
        if (height < 450) return <SizeWarningPage size={{ width, height }} error="height" />;
        if (TokenService.checkAuth()) return privateRoutes;
        return webView();
    };

    return getRouting();
}

export default Routing;
