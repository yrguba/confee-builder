import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import React, { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { enable, isEnabled, disable } from 'tauri-plugin-autostart-api';

import { appApi, appService, AppSettingsView, appStore } from 'entities/app';
import { viewerApi } from 'entities/viewer';
import { useTheme, useStorage, useEasyState, useUnmount } from 'shared/hooks';
import { Modal } from 'shared/ui';

import CacheModal from './modals/cache';
import SessionModal from './modals/session';
import { chatStore } from '../../../entities/chat';
import { viewerStore } from '../../../entities/viewer';

function AppSettings() {
    const storage = useStorage();
    const theme = useTheme();

    const { data: viewerData, isLoading } = viewerApi.handleGetViewer();
    const { mutate: handleLogout } = viewerApi.handleLogout();
    const { mutate: handleDeleteAccount } = viewerApi.handleDeleteAccount();

    const viewer = viewerStore.use.viewer();
    const session = viewerStore.use.session();
    const tokens = viewerStore.use.tokens();

    const { mutate: handleGlobalMute } = appApi.handleGlobalMute();

    const visibleChatGpt = chatStore.use.visibleChatGpt();
    const autostart = appStore.use.autostart();
    const enableNotifications = appStore.use.enableNotifications();

    const sessionModal = Modal.use();
    const cacheModal = Modal.use();

    const confirmLogout = Modal.useConfirm((value, callbackData) => {
        if (value && callbackData) {
            handleLogout(null, {
                onSuccess: () => {
                    tokens.clear();
                    viewer.clear();
                    session.clear();
                    window.location.reload();
                },
            });
        }
    });

    const confirmDeleteAccount = Modal.useConfirm((value, callbackData) => {
        if (value) {
            handleDeleteAccount(null, {
                onSuccess: () => {
                    tokens.clear();
                    viewer.clear();
                    session.clear();
                    window.location.reload();
                },
            });
        }
    });

    const [updateAvailable, setUpdateAvailable] = useState(false);

    const check = async () => {
        try {
            const { shouldUpdate, manifest } = await checkUpdate();
            setUpdateAvailable(shouldUpdate);
        } catch (e) {
            setUpdateAvailable(false);
        }
    };

    const updateApp = async () => {
        await installUpdate();
        await relaunch();
    };

    useEffect(() => {
        if (appService.tauriIsRunning) {
            check().then();
        }
    }, []);

    useUpdateEffect(() => {
        if (appService.tauriIsRunning) {
            if (autostart.value) {
                enable().then();
            } else {
                disable().then();
            }
        }
    }, [autostart.value]);

    return (
        <>
            <Modal.Confirm {...confirmLogout} title="Выйти из аккаунта" closeText="Отмена" okText="Выйти" />
            <Modal.Confirm {...confirmDeleteAccount} title="Удалить аккаунт" closeText="Отмена" okText="Удалить" />
            <SessionModal {...sessionModal} />
            <CacheModal {...cacheModal} />
            <AppSettingsView
                visibleSwitchChatGpt={!!viewerData?.companies?.length}
                visibleChatGpt={visibleChatGpt}
                openCacheModal={cacheModal.open}
                updateAvailable={updateAvailable}
                updateApp={updateApp}
                theme={theme}
                enableNotifications={enableNotifications}
                logout={confirmLogout.open}
                deleteAccount={confirmDeleteAccount.open}
                openSessionModal={sessionModal.open}
                autostart={autostart}
                globalNotifications={{
                    value: viewer.value.muted,
                    toggle: () => handleGlobalMute({ mute: !viewer.value.muted }),
                }}
            />
        </>
    );
}

export default AppSettings;
