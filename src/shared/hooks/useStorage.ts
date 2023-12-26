const ls = window.localStorage;
export type ValuesInStorage =
    | 'access_token'
    | 'refresh_token'
    | 'theme'
    | 'notification'
    | 'viewer_id'
    | 'save_in_cache'
    | 'chat_list_width'
    | 'active-chats-tab'
    | 'req-to-join-room';
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
