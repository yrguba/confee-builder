import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStore } from 'shared/hooks';

import { MessageProxy } from './types';

type Store = {
    replyMessage: UseStore.SelectorWithObj<MessageProxy | null>;
    editMessage: UseStore.SelectorWithObj<MessageProxy | null>;
    forwardMessage: UseStore.SelectorWithObj<{ fromChatName: string; message: MessageProxy | null } | null>;
    highlightedMessages: UseStore.SelectorWithArr<MessageProxy>;
};

const { createSelectors, generateSelectorWithObj, generateSelectorWithArr } = useStore<Store>();

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithObj(['replyMessage', 'editMessage', 'forwardMessage'], set),
            ...generateSelectorWithArr(['highlightedMessages'], set),
        }))
    )
);

const useMessageStore = createSelectors(messageStore);

export default useMessageStore;
