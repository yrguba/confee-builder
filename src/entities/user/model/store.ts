import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type ModalName = 'contacts' | 'add-contact' | 'personal-info';

type Store = {
    openModal: ModalName | null;
    setOpenModal: (modalName: ModalName | null) => void;
};

const userStore = create<Store>()(
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

const useUserStore = useCreateSelectors(userStore);

export default useUserStore;
