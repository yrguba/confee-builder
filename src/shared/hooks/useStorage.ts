const ls = window.localStorage;
export type ValuesInStorage =
    | 'access_token'
    | 'refresh_token'
    | 'theme'
    | 'notification'
    | 'viewer_id'
    | 'session'
    | 'chat_list_width'
    | 'active_chats_tab'
    | 'join_meet_data'
    | 'by_meet'
    | 'meet_chat_id';
function useStorage() {
    const set = (name: ValuesInStorage, value: any) => {
        ls.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
    };

    const get = <T = any>(name: ValuesInStorage): T | null => {
        const valueInLs = ls.getItem(name);
        if (!valueInLs) return null;
        if (valueInLs[0] === '{' && valueInLs[valueInLs.length - 1] === '}') return JSON.parse(valueInLs);
        return valueInLs as T;
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
