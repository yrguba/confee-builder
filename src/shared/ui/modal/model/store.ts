import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { UseConfirmProps } from './types';

type Store = {
    openModal: string | null;
    openConfirmModal: boolean;
    confirm: UseConfirmProps | null;
    confirmModalPayload: {
        value?: boolean;
        date?: number;
    };
    setOpenModal: (modalName: string | null) => void;
    setOpenConfirmModal: (value: boolean) => void;
    setConfirm: (props: UseConfirmProps | null) => void;
    setConfirmModalPayload: (data: { value: boolean; date?: number }) => void;
};

const modalStore = create<Store>()(
    devtools(
        immer((set) => ({
            openModal: null,
            openConfirmModal: false,
            confirm: null,
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
            setConfirm: (props) =>
                set((state) => {
                    state.confirm = props;
                }),
        }))
    )
);

const useModalStore = useCreateSelectors(modalStore);

export default useModalStore;
