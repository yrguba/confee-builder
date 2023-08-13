import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export default function useStore<T extends Record<any, { value: any; set: (value: any) => void }>>() {
    const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
        const store = _store as WithSelectors<typeof _store>;
        store.use = {};
        for (const k of Object.keys(store.getState())) {
            (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
        }

        return store;
    };

    const createObject = (key: keyof T, set: any) => {
        const obj = {
            value: null,
            set: (value: any) =>
                set((state: any) => {
                    state[key].value = value;
                }),
        };
        return obj;
    };

    return { createSelectors, createObject };
}
