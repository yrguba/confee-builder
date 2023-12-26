import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, useCreateSelectors, UseStoreTypes } from 'shared/hooks';

import { ChatProxy, ChatsTypes } from '../../chat/model/types';

type Store = {
    invitationToConference: UseStoreTypes.SelectorWithObj<{
        avatar: string;
        id: string;
        name: string;
    }>;
};

const { createSelectors, generateSelectorWithObj, generateSelectorWithArr } = useStore<Store>();
const meetStore = create<Store>()(
    devtools(
        immer((set, getState) => ({
            ...generateSelectorWithObj(['invitationToConference'], set),
        }))
    )
);

const useMeetStore = useCreateSelectors(meetStore);

export default useMeetStore;
