import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { ChatProxy } from './types';

type Store = {
    socketAction: string;
    setSocketAction: (action: string) => void;
};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;
