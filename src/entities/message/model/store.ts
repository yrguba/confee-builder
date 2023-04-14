import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { MessageProxy, MediaContentType } from './types';

type Store = {
    socketAction: string;
    isOpenEmojiPicker: boolean;
    isOpenInputMenu: boolean;
    mediaContentToSend: { type: MediaContentType; list: string[]; formData: FormData | null } | null;
    messageToEdit: MessageProxy | null;
    messageToReply: MessageProxy | null;
    messagesToForward: MessageProxy[];
    messagesToDelete: MessageProxy[];
    setSocketAction: (action: string) => void;
    setIsOpenEmojiPicker: (bool: boolean) => void;
    setIsOpenInputMenu: (bool: boolean) => void;
    setMediaContentToSend: (data: { type: MediaContentType; list: string[]; formData: FormData | null } | null) => void;
    setMessageToEdit: (message: MessageProxy | null) => void;
    setMessageToReply: (message: MessageProxy | null) => void;
    setMessagesToForward: (message: MessageProxy[] | []) => void;
    setMessagesToDelete: (message: MessageProxy[] | []) => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            isOpenEmojiPicker: false,
            isOpenInputMenu: false,
            mediaContentToSend: null,
            messageToEdit: null,
            messageToReply: null,
            messagesToForward: [],
            messagesToDelete: [],

            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
            setIsOpenEmojiPicker: (bool) =>
                set((state) => {
                    state.isOpenEmojiPicker = bool;
                }),
            setIsOpenInputMenu: (bool) =>
                set((state) => {
                    state.isOpenInputMenu = bool;
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
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;
