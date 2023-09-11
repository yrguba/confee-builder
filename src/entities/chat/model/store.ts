import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStoreTypes } from 'shared/hooks';

type Store = {
    chatSubscription: UseStoreTypes.SelectorWithPrimitive<number | null>;
};

const { createSelectors, generateSelectorWithPrimitive } = useStore<Store>();

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithPrimitive(['chatSubscription'], set),
        }))
    )
);

const useChatStore = createSelectors(chatStore);

export default useChatStore;
