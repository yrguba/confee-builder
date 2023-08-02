import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

type Store = {
    openModal: string | null;
    openConfirmModal: boolean;
    confirmTitle: string;
    confirmModalPayload: {
        value?: boolean;
        date?: number;
    };
    setOpenModal: (modalName: string | null) => void;
    setOpenConfirmModal: (title: boolean) => void;
    setConfirmTitle: (modalName: string) => void;
    setConfirmModalPayload: (data: { value: boolean; date?: number }) => void;
};

const modalStore = create<Store>()(
    devtools(
        immer((set) => ({
            openModal: null,
            openConfirmModal: false,
            confirmTitle: '',
            confirmModalPayload: {},
            setOpenModal: (ModalName) =>
                set((state) => {
                    state.openModal = ModalName;
                }),
            setOpenConfirmModal: (value) =>
                set((state) => {
                    state.openConfirmModal = value;
                }),
            setConfirmModalPayload: (value) =>
                set((state) => {
                    state.confirmModalPayload = value;
                }),
            setConfirmTitle: (title) =>
                set((state) => {
                    state.confirmTitle = title;
                }),
        }))
    )
);

const useModalStore = useCreateSelectors(modalStore);

export default useModalStore;
