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

const { createSelectors, createObject } = useStore<Store>();

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            replyMessage: createObject('replyMessage', set),
            editMessage: {
                value: null,
                set: (message) =>
                    set((state) => {
                        state.editMessage.value = message;
                    }),
            },
        }))
    )
);

const useMessageStore = createSelectors(messageStore);

export default useMessageStore;
