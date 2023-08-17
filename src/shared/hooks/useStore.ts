import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

type SelectorWithPrimitive<T extends number | string | null> = {
    value: T;
    set: (arg: T) => void;
};

type SelectorWithObj<T extends object> = {
    value: T;
    set: (arg: T) => void;
    clear: () => void;
};

type SelectorWithArr<T extends { id: number | string; [key: string]: any }> = {
    value: T[];
    pushOrDelete: (arg: T) => void;
    push: (arg: T) => void;
    clear: () => void;
};

function useStore<T extends Record<any, SelectorWithPrimitive<any> | SelectorWithObj<any> | SelectorWithArr<any>>>() {
    const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
        const store = _store as WithSelectors<typeof _store>;
        store.use = {};
        for (const k of Object.keys(store.getState())) {
            (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
        }

        return store;
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
                value: {},
                set: (value: any) =>
                    set((state: any) => {
                        state[key].value = value;
                    }),
                clear: () =>
                    set((state: any) => {
                        state[key].value = {};
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
