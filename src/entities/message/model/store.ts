import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    socketAction: string;
    isOpenEmojiPicker: boolean;
    setSocketAction: (action: string) => void;
    setIsOpenEmojiPicker: (bool: boolean) => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            isOpenEmojiPicker: false,
            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
            setIsOpenEmojiPicker: (bool) =>
                set((state) => {
                    state.isOpenEmojiPicker = bool;
                }),
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;
