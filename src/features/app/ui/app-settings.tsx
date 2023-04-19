import React, { useEffect, useState } from 'react';

import { AppSettingsView } from 'entities/app';
import { useToggle, useTheme } from 'shared/hooks';
import { UniversalStorage } from 'shared/services';

import { ThemesNames } from '../../../shared/enums';

function AppSettings() {
    const not_scope = UniversalStorage.localStorageGet('not_scope');
    const [appScope, toggleAppScope] = useToggle(!!not_scope?.app);
    const [deskScope, toggleDeskScope] = useToggle(!!not_scope?.desk);
    const [theme, setTheme] = useTheme();

    useEffect(() => {
        UniversalStorage.localStorageSet('not_scope', { app: appScope, desk: deskScope });
    }, [appScope, deskScope]);

    const selectTheme = (theme: keyof typeof ThemesNames) => {
        setTheme(theme);
    };

    const items = [
        { id: 1, title: 'Уведомления внутри приложения:', value: appScope ? 'Включено' : 'Выключено', onClick: toggleAppScope },
        { id: 2, title: 'Уведомления на рабочем столе:', value: deskScope ? 'Включено' : 'Выключено', onClick: toggleDeskScope },
        { id: 3, title: 'Тема:', value: theme, onSelect: selectTheme },
    ];

    return <AppSettingsView items={items} />;
}

export default AppSettings;
