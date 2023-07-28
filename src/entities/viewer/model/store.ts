import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { ModalName } from './types';

type Store = {
    openModal: ModalName | null;
    setOpenModal: (modalName: ModalName | null) => void;
};

const viewerStore = create<Store>()(
    devtools(
        immer((set) => ({
            openModal: null,
            setOpenModal: (ModalName) =>
                set((state) => {
                    state.openModal = ModalName;
                }),
        }))
    )
);

const useViewerStore = useCreateSelectors(viewerStore);

export default useViewerStore;
