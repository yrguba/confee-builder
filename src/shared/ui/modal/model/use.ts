import { useEffect, useRef, useState } from 'react';
import { usePrevious } from 'react-use';

import useModalStore from './store';
import { UseConfirmProps } from './types';

function use<T>(modalName: keyof T) {
    const openModal = useModalStore.use.modal();

    const open = (payload?: T[keyof T]) => {
        openModal.set(modalName as string, payload);
    };

    const close = () => {
        openModal.set(null);
    };

    const isOpen = !!openModal && openModal.value === modalName;
    const p: T[keyof T] = openModal.payload;
    return { isOpen, payload: p, open, close };
}

function useConfirm<T = null>(props: UseConfirmProps<T>) {
    const openConfirmModal = useModalStore.use.confirmModal();
    const prev = usePrevious(openConfirmModal.value);
    const open = (payload?: T) => {
        openConfirmModal.set({ value: true, payload, props });
    };

    const close = () => {
        openConfirmModal.set({ value: false });
    };

    useEffect(() => {
        prev && props.callback(openConfirmModal.confirm, openConfirmModal.payload as T);
    }, [openConfirmModal.value]);

    return { isOpen: openConfirmModal.value, open, close };
}

export { use, useConfirm };
