import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, UseStoreTypes } from 'shared/hooks';

import { ChatProxy, ChatsTypes } from '../../chat/model/types';

type Store = {
    joinRequest: UseStoreTypes.SelectorWithObj<{
        avatar: string;
        id: string;
        name: string;
    }>;
};

const { createSelectors, generateSelectorWithObj, generateSelectorWithArr } = useStore<Store>();
const meetStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithObj(['joinRequest'], set),
        }))
    )
);

const useMeetStore = useCreateSelectors(meetStore);

export default useMeetStore;
