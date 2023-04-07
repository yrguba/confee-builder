// класс распределения по хранилищам.
// что бы при записи/чтинии не делать проверку по платформам, это будет делаться тут.
// таури чистит куки после каждого перезапуска приложения, поэтому храним конфиг и токены в вайле на жестком диски.
// что бы постоянно не лазитьь на жесткий диск, во время сессии берем то что нужно из лс или кук.
// при каждом новом запуске таури, бновляем куки или лс по мере необходимости из файлов на жеском диске.

import { tauri } from 'shared/constanst';
import { StorageObjectsNames } from 'shared/enums';
import { storages } from 'shared/lib';

class UniversalStorage {
    localStorageSet(name: keyof typeof StorageObjectsNames, value: string) {
        storages.ls.set(name, value);
    }

    localStorageGet(name: keyof typeof StorageObjectsNames) {
        return storages.ls.get(name);
    }

    localStorageRemove(name: keyof typeof StorageObjectsNames) {
        storages.ls.remove(name);
    }

    localStorageClear(name: keyof typeof StorageObjectsNames) {
        storages.ls.clear();
    }

    async cookieSet(name: keyof typeof StorageObjectsNames, value: string) {
        if (tauri.isRunning) await storages.fs.set(name, value);
        storages.cookie.set(name, value);
    }

    async cookieGet(name: keyof typeof StorageObjectsNames) {
        if (!tauri.isRunning) {
            return storages.cookie.get(name);
        }
        const valueInCookie = storages.cookie.get(name);
        if (valueInCookie) return valueInCookie;
        const valueInFs = await storages.fs.get(name);
        valueInFs && storages.cookie.set(name, valueInFs);
        return valueInFs;
    }

    async cookieRemove(name: keyof typeof StorageObjectsNames) {
        if (tauri.isRunning) await storages.fs.remove(name);
        storages.cookie.remove(name);
    }
}
export default new UniversalStorage();
