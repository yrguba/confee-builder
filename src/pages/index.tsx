import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { ViewerApi, TokensService } from 'entities/viewer';
import { webView } from 'features/auth';
import { SizeWarningPage } from 'pages/warning';
import { useWindowSize } from 'shared/hooks';

import initialFillingProfilePageRouters from './initial-filling-profile';
import mainRoutes from './main';

function Routing() {
    const { width, height } = useWindowSize();

    const location = useLocation();
    const navigate = useNavigate();
    const { data: viewerData, isLoading } = ViewerApi.handleGetViewer();

    const initialFillingProfileRoutes = (
        <Routes>
            {initialFillingProfilePageRouters}
            <Route path="*" element={<Navigate to="/filling_profile/step1" replace />} />
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
        if (TokensService.checkAuth()) {
            if (location.pathname.includes('/filling_profile')) {
                return initialFillingProfileRoutes;
            }

            return mainRoutes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
