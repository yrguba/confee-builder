import { checkUpdate } from '@tauri-apps/api/updater';
import { AnimatePresence } from 'framer-motion';
import React, { Suspense, useEffect } from 'react';
import { useParams } from 'react-router';
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
import { Audio } from '../shared/ui';

function Routing() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const { width, height } = useWindowSize();

    const networkState = appService.getNetworkState();

    const checkAuth = tokensService.checkAuth();
    const { data: viewerData, isFetching, error: viewerError } = viewerApi.handleGetViewer(checkAuth);

    const session = viewerData?.data.data.session;
    const user = viewerData?.data.data.user;
    const storage = useStorage();

    const routes = (
        <>
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
            {!params.chat_id && <Audio.Player sliderPosition="top" />}
        </>
    );

    useUpdateEffect(() => {
        if (session?.id) {
            storage.set('session', session);
        }
    }, [session?.id]);

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
        if (checkAuth && user) {
            if (!user?.nickname) return navigate('/filling_profile');
            ['/warning/server', '/filling_profile'].includes(location.pathname) && navigate('/chats');
        }
    }, [user]);

    const getRouting = () => {
        if (checkAuth) {
            return routes;
        }
        return webView();
    };

    return getRouting();
}

export default Routing;
