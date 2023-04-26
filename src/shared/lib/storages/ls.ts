import { StorageObjectsNames } from 'shared/enums';

const ls = window.localStorage;
export const set = (name: keyof typeof StorageObjectsNames, value: any) => {
    ls.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
};

export const get = (name: keyof typeof StorageObjectsNames) => {
    const valueInLs = ls.getItem(name);
    if (!valueInLs) return null;
    if (valueInLs[0] === '{' && valueInLs[valueInLs.length - 1] === '}') return JSON.parse(valueInLs);
    return valueInLs;
};

export const remove = (name: keyof typeof StorageObjectsNames) => {
    ls.removeItem(name);
};

export const clear = () => {
    ls.clear();
};
