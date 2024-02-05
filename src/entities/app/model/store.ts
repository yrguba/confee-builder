import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, UseStoreTypes } from 'shared/hooks';

type Store = {
    initialOpenChat: UseStoreTypes.SelectorWithArr<{
        id: number;
        name: string;
        src: string;
        url: string;
    }>;
};
const { createSelectors, generateSelectorWithObj, generateSelectorWithArr } = useStore<Store>();
const AppStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithArr([], set),
        }))
    )
);

const useAppStore = useCreateSelectors(AppStore);

export default useAppStore;
