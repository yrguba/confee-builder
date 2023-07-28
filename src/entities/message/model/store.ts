import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { MessageProxy, MediaContentType, MediaContentTypeKeys, File } from './types';

type Store = {
    socketAction: string;
    mediaContentToSend: { type: MediaContentTypeKeys; list: { url: string; name: string }[]; formData: FormData | null } | null;
    messageToEdit: MessageProxy | null;
    messageToReply: MessageProxy | null;
    messagesToForward: MessageProxy[];
    messagesToDelete: MessageProxy[];
    setSocketAction: (action: string) => void;
    setMediaContentToSend: (data: { type: MediaContentTypeKeys; list: { url: string; name: string }[]; formData: FormData | null } | null) => void;
    setMessageToEdit: (message: MessageProxy | null) => void;
    setMessageToReply: (message: MessageProxy | null) => void;
    setMessagesToForward: (message: MessageProxy[] | []) => void;
    setMessagesToDelete: (message: MessageProxy[] | []) => void;
    contentForModal: File[];
    setContentForModal: (content: File[]) => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            mediaContentToSend: null,
            messageToEdit: null,
            messageToReply: null,
            messagesToForward: [],
            messagesToDelete: [],
            contentForModal: [],

            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
            setMediaContentToSend: (data) =>
                set((state) => {
                    state.mediaContentToSend = data;
                }),
            setMessageToEdit: (message) =>
                set((state) => {
                    state.messageToEdit = message;
                }),
            setMessageToReply: (messages) =>
                set((state) => {
                    state.messageToReply = messages;
                }),
            setMessagesToForward: (messages) =>
                set((state) => {
                    state.messagesToForward = messages;
                }),
            setMessagesToDelete: (messages) =>
                set((state) => {
                    state.messagesToDelete = messages;
                }),
            setContentForModal: (content) =>
                set((state) => {
                    state.contentForModal = content;
                }),
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;
