const ls = window.localStorage;
export type ValuesInStorage =
    | 'access_token'
    | 'refresh_token'
    | 'theme'
    | 'notification'
    | 'viewer_id'
    | 'session'
    | 'chat_list_width'
    | 'max_cache_size'
    | 'active_chats_tab'
    | 'join_meet_data'
    | 'by_meet'
    | 'meet_chat_id'
    | 'last_message_with_chat_gpt';

function useStorage() {
    const set = (name: ValuesInStorage, value: any) => {
        ls.setItem(name, typeof value === 'string' ? value : JSON.stringify(value));
        window.dispatchEvent(new Event('storage'));
    };

    const get = <T = any>(name: ValuesInStorage): T | null => {
        const valueInLs = ls.getItem(name);
        if (!valueInLs) return null;
        if (valueInLs[0] === '{' && valueInLs[valueInLs.length - 1] === '}') return JSON.parse(valueInLs);
        return valueInLs as T;
    };

    const remove = (name: ValuesInStorage) => {
        ls.removeItem(name);
        window.dispatchEvent(new Event('storage'));
    };

    const clear = () => {
        ls.clear();
        window.dispatchEvent(new Event('storage'));
    };

    const listener = <T = any>(name: ValuesInStorage, callback: (value: T | null) => void) => {
        window.addEventListener('storage', () => {
            callback(get<T>(name));
        });
    };

    return { set, get, remove, clear, listener };
}

export default useStorage;
