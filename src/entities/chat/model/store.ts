import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStoreTypes } from 'shared/hooks';

type Store = {
    chatSubscription: UseStoreTypes.SelectorWithPrimitive<number | null>;
};

const { createSelectors, generateSelectorWithObj } = useStore<Store>();

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithObj(['chatSubscription'], set),
        }))
    )
);

const useChatStore = createSelectors(chatStore);

export default useChatStore;
