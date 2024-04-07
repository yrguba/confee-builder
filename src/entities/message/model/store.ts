import { useZustand, UseZustandTypes, UseFileUploaderTypes } from 'shared/hooks';

import { MediaContentType, Message, MessageProxy, MessageWithChatGpt } from './types';

type Store = {
    replyMessage: MessageProxy;
    editMessage: MessageProxy;
    messagesForDelete: MessageProxy[];
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
    filesToSend: UseFileUploaderTypes.Types.SortByAcceptType;
};

type FilesType = 'image' | 'video' | 'audio' | 'document';

type Methods = {
    highlightedMessages: {
        pushOrDelete: (message: MessageProxy) => void;
    };
    filesToSend: {
        deleteById: (data: { type: FilesType; id: string | number }) => void;
        replaceById: (data: { type: FilesType; id: string | number; file: File; url: string }) => void;
        add: (data: { type: FilesType; files: any[] }) => void;
    };
};

const messageStore = useZustand<Store, Methods>({
    keys: [
        'messagesForDelete',
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
        'filesToSend',
    ],
    default: {
        highlightedMessages: [],
        filesToSend: {} as any,
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
        filesToSend: (use) => ({
            deleteById: ({ type, id }) => {
                const { state, updater } = use();
                const upd = state.filesToSend.value[type].filter((i) => i.id !== id);
                updater({ filesToSend: { ...state.filesToSend.value, [type]: upd } });
            },
            add: ({ type, files }) => {
                const { state, updater } = use();
                updater({ filesToSend: { ...state.filesToSend.value, [type]: [...files, ...state.filesToSend.value[type]] } });
            },
            replaceById: ({ type, id, file, url }) => {
                const { state, updater } = use();
                const upd = state.filesToSend.value[type].map((i) => {
                    if (i.id === id) return { ...i, file, fileUrl: url };
                    return i;
                });
                updater({ filesToSend: { ...state.filesToSend.value, [type]: upd } });
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
