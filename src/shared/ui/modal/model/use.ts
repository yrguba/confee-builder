import { useEffect } from 'react';
import { usePrevious } from 'react-use';

import useModalStore from './store';
import { UseConfirmProps } from './types';

function use<MN>(modalNames: MN, options?: { showPrevModalAfterClose: boolean }) {
    const openModal: any = useModalStore.use.openModal();

    const prevValue = usePrevious(openModal);
    const setOpenModal: any = useModalStore.use.setOpenModal();

    const open = () => {
        setOpenModal(modalNames as string);
    };

    const close = () => {
        if (options?.showPrevModalAfterClose && prevValue) {
            setOpenModal(prevValue || null);
        } else {
            setOpenModal(null);
        }
    };

    const isOpen = !!openModal && openModal === modalNames;

    return { isOpen, open, close };
}

function useConfirm(props: UseConfirmProps) {
    const openConfirmModal = useModalStore.use.openConfirmModal();
    const confirmModalPayload = useModalStore.use.confirmModalPayload();
    const setOpenConfirmModal = useModalStore.use.setOpenConfirmModal();
    const setConfirm = useModalStore.use.setConfirm();

    const open = () => {
        setOpenConfirmModal(true);
        setConfirm(props);
    };

    const close = () => {
        setOpenConfirmModal(false);
        setConfirm(null);
    };

    useEffect(() => {
        confirmModalPayload.date && props.callback(!!confirmModalPayload.value);
    }, [confirmModalPayload.date]);

    return { isOpen: openConfirmModal, open, close };
}

export { use, useConfirm };
