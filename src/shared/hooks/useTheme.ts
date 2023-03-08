import { ThemesNames, StorageObjectsNames } from 'shared/enums';
import { UniversalStorage } from 'shared/services';

function useTheme(theme?: keyof typeof ThemesNames) {
    if (theme) {
        document.documentElement.dataset.theme = theme;
        UniversalStorage.set(StorageObjectsNames.theme, theme).then();
    } else {
        UniversalStorage.get(StorageObjectsNames.theme).then(async (themeFromStorage) => {
            if (themeFromStorage) {
                document.documentElement.dataset.theme = themeFromStorage;
            } else {
                document.documentElement.dataset.theme = ThemesNames.light;
                await UniversalStorage.set(StorageObjectsNames.theme, ThemesNames.light);
            }
        });
    }
}

export default useTheme;
