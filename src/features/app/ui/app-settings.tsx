import React, { useEffect } from 'react';

import { AppSettingsView, appTypes } from 'entities/app';
import { tokensService, viewerApi } from 'entities/viewer';
import { useToggle, useTheme, useStorage, useFs, useEasyState } from 'shared/hooks';

function AppSettings() {
    const storage = useStorage<appTypes.ValuesInStorage>();

    const fs = useFs();

    const { mutate: handleLogout } = viewerApi.handleLogout();
    const { mutate: handleDeleteAccount } = viewerApi.handleDeleteAccount();

    const not_scope = storage.get('notification_scope');
    const [appScope, toggleAppScope] = useToggle(!!not_scope?.app);
    const [deskScope, toggleDeskScope] = useToggle(!!not_scope?.desk);
    const cacheSize = useEasyState<string | null | undefined>(null);
    const cacheText = useEasyState<string>('');
    const cacheValue = useEasyState<string>('');
    const r = useEasyState(false);
    const [theme, setTheme] = useTheme();

    useEffect(() => {
        storage.set('notification_scope', { app: appScope, desk: deskScope });
    }, [appScope, deskScope]);

    useEffect(() => {
        fs.getFolderSize({ baseDir: 'Document', folderDir: 'cache' }).then((size) => {
            cacheSize.set(size?.human);
        });
    }, []);

    const clickCache = () => {
        r.toggle();
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
        if (cacheSize.value) {
            cacheValue.set('Очистить');
            return cacheText.set(`Кэш занимает на диске: ${cacheSize.value}:`);
        }
        if (storage.get('cache_size')) {
            cacheValue.set('Выключить кэширование');
            return cacheText.set(`Кэш пуст:`);
        }
        cacheText.set(`Кэширование отключенно:`);
        return cacheValue.set('Включить');
    }, [cacheSize.value, r.value]);

    const logout = () => {
        tokensService.remove();
        handleLogout(null);
        window.location.reload();
    };

    const deleteAccount = () => {
        handleDeleteAccount(null, {
            onSuccess: () => {
                tokensService.remove();
                window.location.reload();
            },
        });
    };

    const items = [
        { id: 1, title: 'Уведомления внутри приложения:', value: appScope ? 'Включено' : 'Выключено', onClick: toggleAppScope },
        { id: 2, title: 'Уведомления на рабочем столе:', value: deskScope ? 'Включено' : 'Выключено', onClick: toggleDeskScope },
        { id: 3, title: cacheText.value, value: cacheValue.value, onClick: clickCache },
        { id: 4, title: 'Тема:', value: theme },
    ];

    return <AppSettingsView items={items} logout={logout} deleteAccount={deleteAccount} />;
}

export default AppSettings;
