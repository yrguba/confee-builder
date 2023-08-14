import { useCallback, useEffect, useState } from 'react';
import { usePrevious } from 'react-use';

import useModalStore from './store';
import { UseConfirmProps } from './types';

function use<MN>(modalNames: MN) {
    const openModal: any = useModalStore.use.openModal();
    const prevValue = usePrevious(modalNames);
    const setOpenModal: any = useModalStore.use.setOpenModal();

    const open = () => {
        setOpenModal(modalNames as string);
    };

    const close = () => {
        setOpenModal(null);
    };

    const isOpen = !!openModal && openModal === modalNames;

    return { isOpen, open, close };
}

function useConfirm<T = null>(props: UseConfirmProps<T>) {
    const openConfirmModal = useModalStore.use.openConfirmModal();
    const confirmModalPayload = useModalStore.use.confirmModalPayload();
    const setOpenConfirmModal = useModalStore.use.setOpenConfirmModal();
    const setConfirm = useModalStore.use.setConfirm();
    const [callbackData, setCallbackData] = useState<T | null>(null);

    const open = (callbackData?: T) => {
        callbackData && setCallbackData(callbackData);
        setOpenConfirmModal(true);
        setConfirm(props);
    };

    const close = () => {
        setCallbackData(null);
        setOpenConfirmModal(false);
        setConfirm(null);
    };

    useEffect(() => {
        confirmModalPayload.date && props.callback(!!confirmModalPayload.value, callbackData as T);
    }, [confirmModalPayload.date]);

    return { isOpen: openConfirmModal, open, close };
}

export { use, useConfirm };
