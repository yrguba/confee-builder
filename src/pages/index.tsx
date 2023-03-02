import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { RoutesNames } from 'shared/enums';
import { TokenService } from 'shared/services';

import authRoutes from './auth/routes';
import mainRouters from './main/routes';

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
            <Route path="*" element={<Navigate to={RoutesNames.main.base} replace />} />
        </Routes>
    );

    const publicRoutes = (
        <Routes>
            {authRoutes}
            <Route path="*" element={<Navigate to={RoutesNames.auth.base} replace />} />
        </Routes>
    );

    return isAuth ? privateRoutes : publicRoutes;
}

export default Routing;
