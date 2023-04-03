import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    initialPage: number;
    setInitialPage: (page: number) => void;
};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            initialPage: 1,
            setInitialPage: (page) =>
                set((state) => {
                    state.initialPage = page;
                }),
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;
