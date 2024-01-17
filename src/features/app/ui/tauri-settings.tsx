import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import React, { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import { boolean } from 'yup';

import { TauriSettingsView, appService, appTypes } from 'entities/app';

import { useEasyState, useFs, useStorage } from '../../../shared/hooks';

// tauri only
function TauriSettings() {
    const storage = useStorage();
    const fs = useFs();
    if (!appService.tauriIsRunning) return null;

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

    const cacheSize = useEasyState<string>('');

    useEffect(() => {
        // cacheSize.set('загрузка...');
        // fs.getFolderSize({ baseDir: 'Document', folderDir: 'cache' }).then((res) => {
        //     cacheSize.set(res?.human || '');
        // });
    }, []);

    return <TauriSettingsView cacheSize={cacheSize.value} updateAvailable={updateAvailable} updateApp={updateApp} />;
}

export default TauriSettings;
