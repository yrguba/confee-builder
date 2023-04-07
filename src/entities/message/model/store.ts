import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    socketAction: string;
    setSocketAction: (action: string) => void;
};

const messageStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
        }))
    )
);

const useMessageStore = useCreateSelectors(messageStore);

export default useMessageStore;
