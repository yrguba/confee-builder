import { useZustand, UseZustandTypes } from 'shared/hooks';

import { MediaContentType, Message, MessageProxy, MessageWithChatGpt } from './types';

type Store = {
    replyMessage: MessageProxy;
    editMessage: MessageProxy;
    forwardMessages?: { fromChatName: string; toChatId: number | null; messages: MessageProxy[]; redirect: boolean };
    highlightedMessages: MessageProxy[];
    voiceRecordingInProgress: boolean;
    visibleSearchMessages: boolean;
    initialPage: number | null;
    foundMessage: Message | null;
    goDownList: boolean;
    isFileDrag: boolean;
    openForwardMessageModal: boolean;
    menuMessageId: number | null;
    lastMessageWithChatGpt: MessageWithChatGpt;
    downloadFile: { fileType: MediaContentType; callback: () => void };
};

type Methods = {
    highlightedMessages: {
        pushOrDelete: (message: MessageProxy) => void;
    };
};

const messageStore = useZustand<Store, Methods>({
    keys: [
        'voiceRecordingInProgress',
        'visibleSearchMessages',
        'initialPage',
        'goDownList',
        'isFileDrag',
        'menuMessageId',
        'openForwardMessageModal',
        'replyMessage',
        'editMessage',
        'forwardMessages',
        'foundMessage',
        'downloadFile',
        'lastMessageWithChatGpt',
        'highlightedMessages',
    ],
    default: {
        highlightedMessages: [],
    },
    methods: {
        highlightedMessages: (use) => ({
            pushOrDelete: (message) => {
                const { state, updater } = use();
                if (!state.highlightedMessages.value.find((i) => i.id === message.id)) {
                    updater({ highlightedMessages: [...state.highlightedMessages.value, message] });
                } else {
                    updater({ highlightedMessages: state.highlightedMessages.value.filter((i) => i.id !== message.id) });
                }
            },
        }),
    },
    forStorage: {
        storageName: 'message_storage',
        keys: ['lastMessageWithChatGpt'],
    },
});

export type MessageStoreTypes = UseZustandTypes.AllTypes<typeof messageStore.use>;
export default messageStore;
