import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

function useStore<T extends Record<any, { value: any; set: (value: any) => void }>>() {
    const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
        const store = _store as WithSelectors<typeof _store>;
        store.use = {};
        for (const k of Object.keys(store.getState())) {
            (store?.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
        }

        return store;
    };

    const generateState = (keys: Array<keyof T>, set: any): T => {
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

    return { createSelectors, generateState };
}

export default useStore;
