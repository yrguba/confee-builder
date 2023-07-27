import { relaunch } from '@tauri-apps/api/process';
import { checkUpdate, installUpdate } from '@tauri-apps/api/updater';
import React, { useEffect, useState } from 'react';

import { CheckUpdateView, AppService } from 'entities/app';

// tauri only
function CheckUpdate() {
    const { version } = AppService.getProjectInfo();

    if (!AppService.tauriIsRunning) return null;
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

    const items = [
        { id: 0, title: 'Текущая версия:', value: version, onClick: () => '' },
        {
            id: 1,
            title: updateAvailable ? 'Доступно обновление:' : 'Нет доступных обновлений',
            value: updateAvailable ? 'Обновить' : '',
            onClick: () => (updateAvailable ? updateApp() : {}),
        },
    ];

    return <CheckUpdateView items={items} />;
}

export default CheckUpdate;
