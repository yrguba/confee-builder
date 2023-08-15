import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors, useStore } from 'shared/hooks';

import { BaseTypes } from '../../../shared/types';
import { MessageProxy } from '../../message/model/types';

type Store = {
    chatSubscription: BaseTypes.StoreSelectorType<number | null>;
};

const { createSelectors, generateState } = useStore<Store>();

const chatStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateState(['chatSubscription'], set),
        }))
    )
);

const useChatStore = useCreateSelectors(chatStore);

export default useChatStore;
