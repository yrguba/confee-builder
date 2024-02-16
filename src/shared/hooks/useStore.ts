import { StoreApi, UseBoundStore } from 'zustand';
import { createJSONStorage } from 'zustand/esm/middleware';

import { useStorage } from './index';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

type SelectorWithPrimitive<T extends number | string | boolean | null> = {
    value: T;
    set: (arg: T) => void;
};

type SelectorWithObj<T extends object | null> = {
    value: T;
    set: (arg: T) => void;
    clear: () => void;
};

type SelectorWithArr<T extends { id: number | string; [key: string]: any }> = {
    value: T[];
    pushOrDelete: (arg: T) => void;
    push: (arg: T) => void;
    clear: () => void;
    addStart: (arr: T[]) => void;
};

type Props<T> = {
    id: string;
    forStorage: [keyof T];
};

function useStore<T extends Record<any, SelectorWithPrimitive<any> | SelectorWithObj<any> | SelectorWithArr<any> | any>>(props?: Props<T>) {
    const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
        const store = _store as WithSelectors<typeof _store>;
        store.use = {};
        for (const k of Object.keys(store.getState())) {
            (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
        }

        return store;
    };

    const getValueInStorage = (key: keyof T) => {
        const valueInLs = localStorage.getItem(`${props?.id}`);
        if (valueInLs) {
            const parse = JSON.parse(valueInLs);
            if (parse[key]) {
                return parse[key];
            }
            return null;
        }
    };

    const generateSelectorWithPrimitive = (keys: Array<keyof T>, set: any): T => {
        const obj = {};

        keys.forEach((key) => {
            // @ts-ignore
            obj[key] = {
                value: null,
                set: (value: any) =>
                    set((state: any) => {
                        state[key].value = value;
                    }),
            };
        });
        return obj as T;
    };

    const generateSelectorWithObj = (keys: Array<keyof T>, set: any): T => {
        const obj = {};

        keys.forEach((key) => {
            // @ts-ignore
            obj[key] = {
                value: getValueInStorage(key) || {},
                set: (value: any) =>
                    set((state: any) => {
                        if (props?.forStorage.length) {
                            localStorage.setItem(props.id, JSON.stringify({ [key]: value }));
                        }
                        state[key].value = value;
                    }),
                clear: () =>
                    set((state: any) => {
                        state[key].value = {};
                        if (props?.forStorage.length) {
                            const valueInLs = localStorage.getItem(`${props?.id}`);
                            if (valueInLs) {
                                const parse = JSON.parse(valueInLs);
                                parse[key] = {};
                                localStorage.setItem(props.id, JSON.stringify(parse));
                            }
                        }
                    }),
            };
        });
        return obj as T;
    };

    const generateSelectorWithArr = (keys: Array<keyof T>, set: any): T => {
        const obj = {};

        keys.forEach((key) => {
            // @ts-ignore
            obj[key] = {
                value: [],
                addStart: (arr: any) =>
                    set((state: any) => {
                        state[key].value = [...arr, ...state[key].value];
                    }),
                clear: () =>
                    set((state: any) => {
                        state[key].value = [];
                    }),
                push: (obj: any) =>
                    set((state: any) => {
                        state[key].value.push(obj);
                    }),
                pushOrDelete: (obj: any) =>
                    set((state: any) => {
                        const foundIndex = state[key].value.findIndex((i: any) => i.id === obj.id);
                        foundIndex !== -1 ? state[key].value.splice(foundIndex, 1) : state[key].value.push(obj);
                    }),
            };
        });
        return obj as T;
    };

    return { createSelectors, generateSelectorWithPrimitive, generateSelectorWithObj, generateSelectorWithArr };
}

export type { SelectorWithPrimitive, SelectorWithObj, SelectorWithArr };

export default useStore;
