import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { TokenService } from 'shared/services';

import authRoutes from './auth';
import mainRouters from './main';
import settingsRouters from './settings';

function Routing() {
    const [isAuth, toggle] = useState<boolean>(true);

    useEffect(() => {
        TokenService.checkAuth().then((res) => {
            isAuth !== res && toggle(res);
        });
    }, []);

    const privateRoutes = (
        <Routes>
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

    return isAuth ? privateRoutes : publicRoutes;
}

export default Routing;
