import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useStore, UseStoreTypes } from 'shared/hooks';

import { MediaContentType, Message, MessageProxy } from './types';

type Store = {
    replyMessage: UseStoreTypes.SelectorWithObj<MessageProxy>;
    editMessage: UseStoreTypes.SelectorWithObj<MessageProxy>;
    forwardMessages: UseStoreTypes.SelectorWithObj<{ fromChatName: string; toChatId: number | null; messages: MessageProxy[]; redirect: boolean }>;
    highlightedMessages: UseStoreTypes.SelectorWithArr<MessageProxy>;
    voiceRecordingInProgress: UseStoreTypes.SelectorWithPrimitive<boolean>;
    visibleSearchMessages: UseStoreTypes.SelectorWithPrimitive<boolean>;
    initialPage: UseStoreTypes.SelectorWithPrimitive<number | null>;
    foundMessage: UseStoreTypes.SelectorWithObj<Message | null>;
    goDownList: UseStoreTypes.SelectorWithPrimitive<boolean>;
    isFileDrag: UseStoreTypes.SelectorWithPrimitive<boolean>;
    menuMessageId: UseStoreTypes.SelectorWithPrimitive<number | null>;
    messagesListWidth: UseStoreTypes.SelectorWithPrimitive<number | null>;
    downloadFile: UseStoreTypes.SelectorWithObj<{
        fileType: MediaContentType;
        callback: () => void;
    }>;
};

const { createSelectors, generateSelectorWithObj, generateSelectorWithArr, generateSelectorWithPrimitive } = useStore<Store>();

const messageStore = create<Store>()(
    devtools(
        immer((set, getState) => ({
            ...generateSelectorWithPrimitive(
                ['voiceRecordingInProgress', 'visibleSearchMessages', 'initialPage', 'goDownList', 'isFileDrag', 'menuMessageId', 'messagesListWidth'],
                set
            ),
            ...generateSelectorWithObj(['replyMessage', 'editMessage', 'forwardMessages', 'foundMessage', 'downloadFile'], set),
            ...generateSelectorWithArr(['highlightedMessages'], set),
        }))
    )
);

const useMessageStore = createSelectors(messageStore);

export default useMessageStore;
