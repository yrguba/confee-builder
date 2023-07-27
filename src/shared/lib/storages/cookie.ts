import Cookies from 'universal-cookie';

import StorageObjectsNames from './enums';

const cookies = new Cookies();

export const set = (name: keyof typeof StorageObjectsNames, value: string) => {
    cookies.set(name, value, { path: '/', domain: window.location.hostname });
};

export const get = (name: keyof typeof StorageObjectsNames) => {
    return cookies.get(name);
};

export const getAll = () => {
    return cookies.getAll();
};

export const remove = (name: keyof typeof StorageObjectsNames) => {
    cookies.remove(name, { path: '/', domain: window.location.hostname });
};

export const clear = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};
