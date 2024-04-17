import { checkUpdate } from '@tauri-apps/api/updater';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { viewerStore } from 'entities/viewer';
import { Network } from 'features/app';
import { webView } from 'features/auth';

import callPageRouters from './call';
import initialFillingProfilePageRouters from './initial-filling-profile';
import mainRoutes from './main';
import updateAppPageRouters from './update-app';
import warningPageRouters from './warning';
import { appService } from '../entities/app';
import { useWindowSize, useEffectOnce } from '../shared/hooks';
import { Audio } from '../shared/ui';

function Routing() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const { width, height } = useWindowSize();

    const networkState = appService.getNetworkState();

    const checkAuth = !!viewerStore.use.tokens().value?.access_token;

    const viewer = viewerStore.use.viewer();

    const routes = (
        <>
            <AnimatePresence mode="wait">
                <Network />
                <Routes location={location} key={location.pathname.split('/')[1]}>
                    {mainRoutes}
                    {callPageRouters}
                    {initialFillingProfilePageRouters}
                    {warningPageRouters}
                    {updateAppPageRouters}
                    <Route path="*" element={<Navigate to="/chats" replace />} />
                </Routes>
            </AnimatePresence>
            {!params.chat_id && <Audio.Player sliderPosition="top" width={window.innerWidth} />}
        </>
    );

    useEffect(() => {
        if (checkAuth) {
            if (width < 450 || height < 470) return navigate('/warning/size');
            location.pathname === '/warning/size' && navigate(-1);
        }
    }, [width, height]);

    useEffectOnce(() => {
        if (appService.tauriIsRunning && networkState.online && checkAuth) {
            checkUpdate().then(({ shouldUpdate, manifest }) => {
                if (shouldUpdate) {
                    navigate('/update');
                }
            });
        }
    });

    useEffect(() => {
        if (checkAuth && viewer.value) {
            if (!viewer.value?.nickname) return navigate('/filling_profile');
            ['/warning/server', '/filling_profile'].includes(location.pathname) && navigate('/chats');
        }
    }, [viewer.value]);

    const getRouting = () => {
        if (checkAuth) {
            return routes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
