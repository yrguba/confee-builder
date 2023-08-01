import React, { useEffect, useState } from 'react';

import { AppSettingsView, storage } from 'entities/app';
import { useToggle, useTheme } from 'shared/hooks';

function AppSettings() {
    const not_scope = storage.localStorageGet('notification_scope');
    const [appScope, toggleAppScope] = useToggle(!!not_scope?.app);
    const [deskScope, toggleDeskScope] = useToggle(!!not_scope?.desk);
    const [theme, setTheme] = useTheme();

    useEffect(() => {
        storage.localStorageSet('notification_scope', { app: appScope, desk: deskScope });
    }, [appScope, deskScope]);

    const items = [
        { id: 1, title: 'Уведомления внутри приложения:', value: appScope ? 'Включено' : 'Выключено', onClick: toggleAppScope },
        { id: 2, title: 'Уведомления на рабочем столе:', value: deskScope ? 'Включено' : 'Выключено', onClick: toggleDeskScope },
        { id: 3, title: 'Тема:', value: theme },
    ];

    return <AppSettingsView items={items} />;
}

export default AppSettings;
