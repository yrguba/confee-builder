import { useEffect, useState } from 'react';

import useStorage from './useStorage';

enum ThemesNames {
    light = 'light',
    dark = 'dark',
}
export type Themes = keyof typeof ThemesNames;

function useTheme(): { value: Themes; set: (arg: Themes) => void } {
    const storage = useStorage();
    const [activeTheme, setActiveTheme] = useState<Themes>(storage.get('theme') || 'light');

    const setTheme = (theme: Themes) => {
        if (document.documentElement.dataset.theme !== theme) {
            document.documentElement.dataset.theme = theme;
            storage.set('theme', theme);
            setActiveTheme(theme);
        }
    };

    useEffect(() => {
        const themeFromStorage = storage.get('theme');
        if (themeFromStorage) {
            if (document.documentElement.dataset.theme !== themeFromStorage) {
                document.documentElement.dataset.theme = themeFromStorage;
                setActiveTheme(themeFromStorage);
            }
        } else {
            document.documentElement.dataset.theme = ThemesNames.light;
            storage.set('theme', ThemesNames.light);
            setActiveTheme('light');
        }
    }, []);

    return { value: activeTheme, set: setTheme };
}

export type UseThemeReturned = ReturnType<typeof useTheme>;

export default useTheme;
