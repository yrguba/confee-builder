import { checkUpdate } from '@tauri-apps/api/updater';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { viewerApi, tokensService } from 'entities/viewer';
import { webView } from 'features/auth';

import callsPageRouters from './calls';
import initialFillingProfilePageRouters from './initial-filling-profile';
import mainRoutes from './main';
import updateAppPageRouters from './update-app';
import warningPageRouters from './warning';
import { useWindowSize, useEffectOnce } from '../shared/hooks';

function Routing() {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const { data: viewerData, isLoading, error: viewerError } = viewerApi.handleGetViewer();

    const routes = (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname.split('/')[1]}>
                {mainRoutes}
                {callsPageRouters}
                {initialFillingProfilePageRouters}
                {warningPageRouters}
                {updateAppPageRouters}
                <Route path="*" element={<Navigate to="/chats" replace />} />
            </Routes>
        </AnimatePresence>
    );

    useEffect(() => {
        if (width < 450 || height < 470) return navigate('/warning/size');
        location.pathname === '/warning/size' && navigate(-1);
    }, [width, height]);

    useEffectOnce(() => {
        checkUpdate().then(({ shouldUpdate, manifest }) => {
            if (shouldUpdate) {
                navigate('/update');
            }
        });
    });

    useEffect(() => {
        if (!isLoading) {
            // @ts-ignore
            // if (viewerError?.response?.status === 500) return navigate('/warning/server');
            if (!viewerData?.user?.nickname) return navigate('/filling_profile');
            ['/warning/server', '/filling_profile'].includes(location.pathname) && navigate('/chats');
        }
    }, [isLoading]);

    const getRouting = () => {
        if (tokensService.checkAuth()) {
            return routes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
