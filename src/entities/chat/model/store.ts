import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStoreTypes } from 'shared/hooks';

type Store = {
    chatSubscription: UseStoreTypes.SelectorWithPrimitive<number | null>;
    idOfSavedFile: UseStoreTypes.SelectorWithPrimitive<number | string | null>;
    initialOpenChat: UseStoreTypes.SelectorWithPrimitive<boolean>;
};

const { createSelectors, generateSelectorWithPrimitive } = useStore<Store>();

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithPrimitive(['chatSubscription', 'idOfSavedFile', 'initialOpenChat'], set),
        }))
    )
);

const useChatStore = createSelectors(chatStore);

export default useChatStore;
