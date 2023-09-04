import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import React, { useEffect, useState } from 'react';
import { boolean } from 'yup';

import { TauriSettingsView, appService, appTypes } from 'entities/app';

import { useEasyState, useFs, useStorage } from '../../../shared/hooks';

// tauri only
function TauriSettings() {
    const { version } = appService.getProjectInfo();
    const storage = useStorage<appTypes.ValuesInStorage>();
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
    const cacheValue = useEasyState<boolean>(!!storage.get('cache_size'));

    const clickCache = () => {
        if (cacheSize.value) {
            return fs.deleteFolder({ baseDir: 'Document', folderDir: 'cache' }).then(() => {
                cacheSize.set('');
            });
        }
        if (storage.get('cache_size')) {
            return storage.remove('cache_size');
        }
        storage.set('cache_size', '111');
    };

    useEffect(() => {
        fs.getFolderSize({ baseDir: 'Document', folderDir: 'cache' }).then((res) => {
            cacheSize.set(res?.human || '');
        });
    }, []);

    return (
        <TauriSettingsView
            cacheValue={cacheValue.value}
            cacheSize={cacheSize.value}
            clickCache={clickCache}
            updateAvailable={updateAvailable}
            updateApp={updateApp}
        />
    );
}

export default TauriSettings;
