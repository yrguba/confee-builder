import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStore } from 'shared/hooks';

import { MessageProxy } from './types';

type Store = {
    replyMessage: UseStore.SelectorWithObj<MessageProxy>;
    editMessage: UseStore.SelectorWithObj<MessageProxy>;
    forwardMessages: UseStore.SelectorWithObj<{ fromChatName: string; messages: MessageProxy[]; redirect: boolean }>;
    highlightedMessages: UseStore.SelectorWithArr<MessageProxy>;
    voiceRecordingInProgress: UseStore.SelectorWithPrimitive<boolean>;
};

const { createSelectors, generateSelectorWithObj, generateSelectorWithArr, generateSelectorWithPrimitive } = useStore<Store>();

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            ...generateSelectorWithPrimitive(['voiceRecordingInProgress'], set),
            ...generateSelectorWithObj(['replyMessage', 'editMessage', 'forwardMessages'], set),
            ...generateSelectorWithArr(['highlightedMessages'], set),
        }))
    )
);

const useMessageStore = createSelectors(messageStore);

export default useMessageStore;
