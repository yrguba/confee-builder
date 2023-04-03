import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {};

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            //
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;
