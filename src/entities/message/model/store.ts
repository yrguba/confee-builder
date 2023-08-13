import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import { MessageProxy } from './types';

type Store = {
    replyMessage: BaseTypes.StoreSelectorType<MessageProxy | null>;
    editMessage: BaseTypes.StoreSelectorType<MessageProxy | null>;
};

const { createSelectors, generateState } = useStore<Store>();

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateState(['replyMessage', 'editMessage'], set),
        }))
    )
);

const useMessageStore = createSelectors(messageStore);

export default useMessageStore;
