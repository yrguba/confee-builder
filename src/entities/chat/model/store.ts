import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore } from 'shared/hooks';

import { BaseTypes } from '../../../shared/types';

type Store = {
    chatSubscription: BaseTypes.StoreSelectorType<number | null>;
    usersTyping: {
        value: Record<number, string[]>;
        set: (value: { chatId: number; users: string[] }) => void;
    };
};

const { createSelectors, generateState } = useStore<Store>();

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateState(['chatSubscription'], set),
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
