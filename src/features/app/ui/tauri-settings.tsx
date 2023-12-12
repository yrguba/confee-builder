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

    const cacheSize = useEasyState<string>('');

    const saveInCache = useEasyState<boolean>(!!storage.get('save_in_cache'));

    // useUpdateEffect(() => {
    //     saveInCache.value ? storage.set('save_in_cache', true) : storage.remove('save_in_cache');
    // }, [saveInCache.value]);

    useEffect(() => {
        // cacheSize.set('загрузка...');
        // fs.getFolderSize({ baseDir: 'Document', folderDir: 'cache' }).then((res) => {
        //     cacheSize.set(res?.human || '');
        // });
    }, []);

    return <TauriSettingsView saveInCache={saveInCache} cacheSize={cacheSize.value} />;
}

export default TauriSettings;
