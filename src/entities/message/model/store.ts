import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { MessageProxy } from './types';

type Store = {
    socketAction: string;
    isOpenEmojiPicker: boolean;
    editableMessage: MessageProxy | null;
    setSocketAction: (action: string) => void;
    setIsOpenEmojiPicker: (bool: boolean) => void;
    setEditableMessage: (message: MessageProxy | null) => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            isOpenEmojiPicker: false,
            editableMessage: null,
            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
            setIsOpenEmojiPicker: (bool) =>
                set((state) => {
                    state.isOpenEmojiPicker = bool;
                }),
            setEditableMessage: (message) =>
                set((state) => {
                    state.editableMessage = message;
                }),
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;
