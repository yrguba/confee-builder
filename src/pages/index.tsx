import { checkUpdate } from '@tauri-apps/api/updater';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';

import { viewerApi, tokensService } from 'entities/viewer';
import { Network } from 'features/app';
import { webView } from 'features/auth';

import initialFillingProfilePageRouters from './initial-filling-profile';
import mainRoutes from './main';
import meetPageRouters from './meet';
import updateAppPageRouters from './update-app';
import warningPageRouters from './warning';
import { appService } from '../entities/app';
import { useWindowSize, useEffectOnce, useStorage } from '../shared/hooks';

function Routing() {
    const location = useLocation();
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const { data: viewerData, isLoading, error: viewerError } = viewerApi.handleGetViewer();

    const networkState = appService.getNetworkState();

    const storage = useStorage();

    const routes = (
        <AnimatePresence mode="wait">
            <Network />
            <Routes location={location} key={location.pathname.split('/')[1]}>
                {mainRoutes}
                {meetPageRouters}
                {initialFillingProfilePageRouters}
                {warningPageRouters}
                {updateAppPageRouters}
                <Route path="*" element={<Navigate to="/chats" replace />} />
            </Routes>
        </AnimatePresence>
    );

    useUpdateEffect(() => {
        if (viewerData?.session?.id) {
            storage.set('session', viewerData.session);
        }
    }, [viewerData?.session?.id]);

    useEffect(() => {
        if (width < 450 || height < 470) return navigate('/warning/size');
        location.pathname === '/warning/size' && navigate(-1);
    }, [width, height]);

    useEffectOnce(() => {
        if (appService.tauriIsRunning && networkState.online) {
            checkUpdate().then(({ shouldUpdate, manifest }) => {
                if (shouldUpdate) {
                    navigate('/update');
                }
            });
        }
    });

    useEffect(() => {
        if (!isLoading) {
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
