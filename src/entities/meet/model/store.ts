import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, UseStoreTypes } from 'shared/hooks';

import { ChatProxy, ChatsTypes } from '../../chat/model/types';

type Store = {
    activeMeeting: UseStoreTypes.SelectorWithObj<ChatProxy | null>;
};

const { createSelectors, generateSelectorWithObj } = useStore<Store>();
const meetStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithObj(['activeMeeting'], set),
        }))
    )
);

const useMeetStore = useCreateSelectors(meetStore);

export default useMeetStore;
