const ls = window.localStorage;
export type ValuesInStorage = 'access_token' | 'refresh_token' | 'theme' | 'notification_scope' | 'viewer_id' | 'cache_size' | 'chat_list_width';

function useStorage() {
    const set = (name: ValuesInStorage, value: any) => {
        ls.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
    };

    const get = (name: ValuesInStorage) => {
        const valueInLs = ls.getItem(name);
        if (!valueInLs) return null;
        if (valueInLs[0] === '{' && valueInLs[valueInLs.length - 1] === '}') return JSON.parse(valueInLs);
        return valueInLs;
    };

    const remove = (name: ValuesInStorage) => {
        ls.removeItem(name);
    };

    const clear = () => {
        ls.clear();
    };

    return { set, get, remove, clear };
}

export default useStorage;
