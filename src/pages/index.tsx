import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { SizeWarningPage } from 'pages/warning';
import { useWindowSize } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { TokenService } from 'shared/services';

import authRoutes from './auth';
import mainRouters from './main';
import settingsRouters from './settings';

function Routing() {
    const [isAuth, toggle] = useState<boolean>(true);

    const { width, height } = useWindowSize();

    useEffect(() => {
        TokenService.checkAuth().then((res) => {
            isAuth !== res && toggle(res);
        });
    }, []);
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
        if (width < 900) return <SizeWarningPage size={{ width, height }} error="width" />;
        if (height < 600) return <SizeWarningPage size={{ width, height }} error="height" />;
        if (isAuth) return privateRoutes;
        return publicRoutes;
    };

    return getRouting();
}

export default Routing;
