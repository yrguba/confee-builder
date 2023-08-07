import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    openRightSidebar: boolean;
    chatSubscription: number | null;
    setOpenRightSidebar: (val: boolean) => void;
    setChatSubscription: (id: number | null) => void;
};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            openRightSidebar: false,
            chatSubscription: null,
            setOpenRightSidebar: (val) =>
                set((state) => {
                    state.openRightSidebar = val;
                }),
            setChatSubscription: (id) =>
                set((state) => {
                    state.chatSubscription = id;
                }),
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;
