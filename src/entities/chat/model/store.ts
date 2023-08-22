import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStoreTypes } from 'shared/hooks';

type Store = {
    chatSubscription: UseStoreTypes.SelectorWithPrimitive<number | null>;
    usersTyping: {
        value: Record<number, string[]>;
        set: (value: { chatId: number; users: string[] }) => void;
    };
};

const { createSelectors, generateSelectorWithObj } = useStore<Store>();

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithObj(['chatSubscription'], set),
            usersTyping: {
                value: {},
                set: async (data) =>
                    set((state) => {
                        state.usersTyping.value[data.chatId] = data.users;
                    }),
            },
        }))
    )
);

const useChatStore = createSelectors(chatStore);

export default useChatStore;
