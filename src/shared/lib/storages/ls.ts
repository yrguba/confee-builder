import { StorageObjectsNames } from 'shared/enums';

const ls = window.localStorage;
export const set = (name: keyof typeof StorageObjectsNames, value: any) => {
    ls.setItem(name, JSON.stringify(value));
};

export const get = (name: keyof typeof StorageObjectsNames) => {
    const valueInLs = ls.getItem(name);
    return valueInLs ? JSON.parse(valueInLs) : null;
};

export const remove = (name: keyof typeof StorageObjectsNames) => {
    ls.removeItem(name);
};

export const clear = () => {
    ls.clear();
};
