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

    const notificationActive = useEasyState(!!not_scope, (value) => {
        value ? storage.set('notification_scope', true) : storage.remove('notification_scope');
    });

    const visibleLastActive = useEasyState(!!not_scope, (value) => {
        value ? storage.set('notification_scope', true) : storage.remove('notification_scope');
    });

    const cacheSize = useEasyState<string | null | undefined>(null);
    const cacheText = useEasyState<string>('');
    const cacheValue = useEasyState<string>('');
    const r = useEasyState(false);

    const theme = useTheme();

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

    return (
        <AppSettingsView
            theme={theme}
            visibleLastActive={visibleLastActive}
            notificationActive={notificationActive}
            logout={logout}
            deleteAccount={deleteAccount}
        />
    );
}

export default AppSettings;
