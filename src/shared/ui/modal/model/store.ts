import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useCreateSelectors } from 'shared/hooks';

import { UseConfirmProps } from './types';

type OpenConfirmModalProps = Omit<UseConfirmProps, 'callback'> | null;
type Store = {
    modal: {
        value: string | null;
        payload: any;
        set: (modalName: string | null, payload?: any) => void;
    };
    confirmModal: {
        value: boolean;
        confirm: boolean;
        props: OpenConfirmModalProps;
        payload: any;
        set: (data: { value?: boolean; confirm?: boolean; props?: OpenConfirmModalProps; payload?: any }) => void;
    };
};

const modalStore = create<Store>()(
    devtools(
        immer((set) => ({
            modal: {
                value: null,
                payload: null,
                set: (ModalName, payload) =>
                    set((state) => {
                        state.modal.value = ModalName;
                        state.modal.payload = payload;
                    }),
            },
            confirmModal: {
                value: false,
                confirm: false,
                props: null,
                payload: null,
                set: (data) =>
                    set((state) => {
                        state.confirmModal = { ...state.confirmModal, ...data };
                    }),
            },
        }))
    )
);

const useModalStore = useCreateSelectors(modalStore);

export default useModalStore;
