import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { Massage } from './types';

type Store = {
    newMessages: boolean;
    // meTrigger: () => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            newMessages: false,
            newMessageTrigger: () =>
                set((state) => {
                    state.newMessages = true;
                }),
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;
