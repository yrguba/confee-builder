import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import React, { useEffect, useState } from 'react';

import { CheckUpdateView, TauriService } from 'entities/tauri';

function CheckUpdate() {
    if (!TauriService.tauriIsRunning) return null;
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

    return <CheckUpdateView updateApp={updateApp} updateAvailable={updateAvailable} />;
}

export default CheckUpdate;
