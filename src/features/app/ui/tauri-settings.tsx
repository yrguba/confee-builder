import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import React, { useEffect, useState } from 'react';

import { TauriSettingsView, appService } from 'entities/app';

import { Modal } from '../../../shared/ui';
import { CacheModal } from '../index';

// tauri only
function TauriSettings() {
    if (!appService.tauriIsRunning) return null;

    const cacheModal = Modal.use();

    const [loading, setLoading] = useState(false);

    const [updateAvailable, setUpdateAvailable] = useState(false);

    const check = async () => {
        try {
            setLoading(true);
            const { shouldUpdate, manifest } = await checkUpdate();
            setUpdateAvailable(shouldUpdate);
        } catch (e) {
            setUpdateAvailable(false);
        } finally {
            setLoading(false);
        }
    };

    const updateApp = async () => {
        await installUpdate();
        await relaunch();
    };

    useEffect(() => {
        check().then();
    }, []);

    return (
        <>
            <CacheModal {...cacheModal} />
            <TauriSettingsView openCacheModal={cacheModal.open} updateAvailable={updateAvailable} updateApp={updateApp} />
        </>
    );
}

export default TauriSettings;
