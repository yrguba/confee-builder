import { useEffect, useState } from 'react';

import { UniversalStorage } from 'shared/services';

enum ThemesNames {
    light = 'light',
    dark = 'dark',
}
type Themes = keyof typeof ThemesNames;
function useTheme(): [theme: Themes, setTheme: (arg: Themes) => void] {
    const [activeTheme, setActiveTheme] = useState<Themes>('light');

    const setTheme = (theme: Themes) => {
        document.documentElement.dataset.theme = theme;
        UniversalStorage.cookieSet('theme', theme);
        setActiveTheme(theme);
    };

    useEffect(() => {
        const themeFromStorage = UniversalStorage.cookieGet('theme');
        if (themeFromStorage) {
            document.documentElement.dataset.theme = themeFromStorage;
            setActiveTheme(themeFromStorage);
        } else {
            document.documentElement.dataset.theme = ThemesNames.light;
            UniversalStorage.cookieSet('theme', ThemesNames.light);
            setActiveTheme('light');
        }
    }, []);

    return [activeTheme, setTheme];
}

export default useTheme;
