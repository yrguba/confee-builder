import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    socketAction: string;
    setSocketAction: (action: string) => void;
};

const viewerStore = create<Store>()(
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

const useViewerStore = useCreateSelectors(viewerStore);

export default useViewerStore;
