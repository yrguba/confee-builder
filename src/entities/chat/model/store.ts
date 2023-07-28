import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { ChatProxy } from './types';

type Store = {
    socketAction: string;
    openRightSidebar: boolean;
    setSocketAction: (action: string) => void;
    setOpenRightSidebar: (val: boolean) => void;
};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            openRightSidebar: false,
            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
            setOpenRightSidebar: (val) =>
                set((state) => {
                    state.openRightSidebar = val;
                }),
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;
