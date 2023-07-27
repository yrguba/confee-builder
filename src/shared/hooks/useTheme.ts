import { useEffect, useState } from 'react';

import { Storage } from 'entities/app';

enum ThemesNames {
    light = 'light',
    dark = 'dark',
}
type Themes = keyof typeof ThemesNames;
function useTheme(): [theme: Themes, setTheme: (arg: Themes) => void] {
    const [activeTheme, setActiveTheme] = useState<Themes>('light');

    const setTheme = (theme: Themes) => {
        document.documentElement.dataset.theme = theme;
        Storage.cookieSet('theme', theme);
        setActiveTheme(theme);
    };

    useEffect(() => {
        const themeFromStorage = Storage.cookieGet('theme');
        if (themeFromStorage) {
            document.documentElement.dataset.theme = themeFromStorage;
            setActiveTheme(themeFromStorage);
        } else {
            document.documentElement.dataset.theme = ThemesNames.light;
            Storage.cookieSet('theme', ThemesNames.light);
            setActiveTheme('light');
        }
    }, []);

    return [activeTheme, setTheme];
}

export default useTheme;
