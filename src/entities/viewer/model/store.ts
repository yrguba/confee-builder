import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    socketAction: string;
    openPersonalInfoModal: boolean;
    setSocketAction: (action: string) => void;
    setOpenPersonalInfoModal: (val: boolean) => void;
};

const viewerStore = create<Store>()(
    devtools(
        immer((set) => ({
            socketAction: '',
            openPersonalInfoModal: false,
            setSocketAction: (action) =>
                set((state) => {
                    state.socketAction = action;
                }),
            setOpenPersonalInfoModal: (val) =>
                set((state) => {
                    state.openPersonalInfoModal = val;
                }),
        }))
    )
);

const useViewerStore = useCreateSelectors(viewerStore);

export default useViewerStore;
