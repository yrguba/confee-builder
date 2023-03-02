// класс распределения по хранилищам.
// что бы при записи/чтинии не делать проверку по платформам, это будет делаться тут.
// таури чистит куки после каждого перезапуска приложения, поэтому храним конфиг и токены в вайле на жестком диски.
// что бы постоянно не лазитьь на жесткий диск, во время сессии берем то что нужно из лс или кук.
// при каждом новом запуске таури, бновляем куки или лс по мере необходимости из файлов на жеском диске.

import { tauri } from 'shared/constanst';
import { StorageObjectsNames } from 'shared/enums';
import { storages } from 'shared/lib';

class UniversalStorage {
    private ls: StorageObjectsNames[] = [StorageObjectsNames.theme];

    private getStorageName(name: keyof typeof StorageObjectsNames): 'ls' | 'cookies' {
        const foundInLs = this.ls.find((i) => i === name);
        return foundInLs ? 'ls' : 'cookies';
    }

    async set(name: keyof typeof StorageObjectsNames, value: string) {
        const storageName = this.getStorageName(name);
        if (tauri.isRunning) await storages.fs.set(name, value);
        if (storageName === 'ls') storages.ls.set(name, value);
        if (storageName === 'cookies') storages.cookie.set(name, value);
    }

    async get(name: keyof typeof StorageObjectsNames) {
        const storageName = this.getStorageName(name);
        if (!tauri.isRunning) {
            if (storageName === 'ls') return storages.ls.get(name);
            if (storageName === 'cookies') return storages.cookie.get(name);
        }
        if (storageName === 'ls') {
            const valueInLs = storages.ls.get(name);
            if (valueInLs) return valueInLs;
            const valueInFs = await storages.fs.get(name);
            valueInFs && storages.ls.set(name, valueInFs);
            return valueInFs;
        }
        if (storageName === 'cookies') {
            const valueInCookie = storages.cookie.get(name);
            if (valueInCookie) return valueInCookie;
            const valueInFs = await storages.fs.get(name);
            valueInFs && storages.cookie.set(name, valueInFs);
            return valueInFs;
        }
    }

    async remove(name: keyof typeof StorageObjectsNames) {
        const storageName = this.getStorageName(name);
        if (tauri.isRunning) await storages.fs.remove(name);
        if (storageName === 'ls') storages.ls.remove(name);
        if (storageName === 'cookies') storages.cookie.remove(name);
    }
}
export default new UniversalStorage();
