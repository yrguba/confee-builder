import React, { useEffect } from 'react';

import { AppSettingsView, appTypes } from 'entities/app';
import { useToggle, useTheme, useStorage, useFs, useEasyState } from 'shared/hooks';

function AppSettings() {
    const storage = useStorage<appTypes.ValuesInStorage>();

    const fs = useFs();

    const not_scope = storage.get('notification_scope');
    const [appScope, toggleAppScope] = useToggle(!!not_scope?.app);
    const [deskScope, toggleDeskScope] = useToggle(!!not_scope?.desk);
    const cacheSizeState = useEasyState<string | null | undefined>(null);

    const [theme, setTheme] = useTheme();

    useEffect(() => {
        storage.set('notification_scope', { app: appScope, desk: deskScope });
    }, [appScope, deskScope]);

    useEffect(() => {
        fs.getFolderSize({ baseDir: 'Document', folderDir: 'cache' }).then((size) => {
            cacheSizeState.set(size?.human);
        });
    }, []);

    const clearCache = () => {
        fs.deleteFolder({ baseDir: 'Document', folderDir: 'cache' }).then(() => {
            fs.getFolderSize({ baseDir: 'Document', folderDir: 'cache' }).then((size) => {
                cacheSizeState.set(size?.human);
            });
        });
    };

    const items = [
        { id: 1, title: 'Уведомления внутри приложения:', value: appScope ? 'Включено' : 'Выключено', onClick: toggleAppScope },
        { id: 2, title: 'Уведомления на рабочем столе:', value: deskScope ? 'Включено' : 'Выключено', onClick: toggleDeskScope },
        { id: 3, title: `Кэш занимает на диске: ${cacheSizeState.value || 0}`, value: 'Очистить', onClick: clearCache },
        { id: 4, title: 'Тема:', value: theme },
    ];

    return <AppSettingsView items={items} />;
}

export default AppSettings;
