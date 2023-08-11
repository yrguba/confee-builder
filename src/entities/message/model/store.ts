import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { MessageProxy, MediaContentType, MediaContentTypeKeys, File } from './types';

type Store = {
    replyMessage: MessageProxy | null;
    setReplyMessage: (message: MessageProxy | null) => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            replyMessage: null,
            setReplyMessage: (message) =>
                set((state) => {
                    state.replyMessage = message;
                }),
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;
