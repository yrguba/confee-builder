import { useEffect, useState } from 'react';

import { ThemesNames, StorageObjectsNames } from 'shared/enums';
import { UniversalStorage } from 'shared/services';

type Themes = keyof typeof ThemesNames;

function useTheme(): [theme: Themes, setTheme: (arg: Themes) => void] {
    const [activeTheme, setActiveTheme] = useState<Themes>('light');

    const setTheme = (theme: Themes) => {
        document.documentElement.dataset.theme = theme;
        UniversalStorage.set(StorageObjectsNames.theme, theme).then();
        setActiveTheme(theme);
    };

    useEffect(() => {
        UniversalStorage.get(StorageObjectsNames.theme).then(async (themeFromStorage) => {
            if (themeFromStorage) {
                document.documentElement.dataset.theme = themeFromStorage;
                setActiveTheme(themeFromStorage);
            } else {
                document.documentElement.dataset.theme = ThemesNames.light;
                await UniversalStorage.set(StorageObjectsNames.theme, ThemesNames.light);
                setActiveTheme('light');
            }
        });
    }, []);

    return [activeTheme, setTheme];
}

export default useTheme;
