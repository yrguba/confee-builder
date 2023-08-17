import { array } from 'yup';
import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

type SelectorWithObj<T extends object | number | string | null> = {
    value: T;
    set: (arg: T) => void;
};

type SelectorWithOArr<T extends { id: number | string; [key: string]: any }> = {
    value: T[];
    pushOrDelete: (arg: T) => void;
};

// type Selectors<T> = T extends Record<any, SelectorWithObj<any> | Record<any, SelectorWithOArr<any>

function useStore<T extends Record<any, SelectorWithObj<any> | SelectorWithOArr<any>>>() {
    const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
        const store = _store as WithSelectors<typeof _store>;
        store.use = {};
        for (const k of Object.keys(store.getState())) {
            (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
        }

        return store;
    };

    const generateSelectorWithObj = (keys: Array<keyof T>, set: any): T => {
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

    const generateSelectorWithArr = (keys: Array<keyof T>, set: any): T => {
        const obj = {};

        keys.forEach((key) => {
            // @ts-ignore
            obj[key] = {
                value: [],
                pushOrDelete: (obj: any) =>
                    set((state: any) => {
                        console.log(obj);
                        const foundIndex = state[key].value.findIndex((i: any) => i.id === obj.id);
                        foundIndex !== -1 ? state[key].value.splice(foundIndex, 1) : state[key].value.push(obj);
                    }),
            };
        });
        return obj as T;
    };

    return { createSelectors, generateSelectorWithObj, generateSelectorWithArr };
}

export type { SelectorWithObj, SelectorWithOArr };

export default useStore;
