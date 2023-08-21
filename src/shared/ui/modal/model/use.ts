import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrevious } from 'react-use';

import useModalStore from './store';
import { UseConfirmProps } from './types';
import { useEasyState } from '../../../hooks';

function use() {
    const openModal = useEasyState(false);

    const open = () => {
        openModal.set(true);
    };

    const close = () => {
        openModal.set(false);
    };

    const isOpen = openModal.value;

    return { isOpen, open, close };
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
