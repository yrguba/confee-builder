import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore } from 'shared/hooks';

const { createSelectors, createObject } = useStore();
type Store = {
    chatSubscription: number | null;
    setChatSubscription: (id: number | null) => void;
};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            chatSubscription: null,
            setChatSubscription: (id) =>
                set((state) => {
                    state.chatSubscription = id;
                }),
        }))
    )
);

const useChatStore = createSelectors(chatStore);

export default useChatStore;
