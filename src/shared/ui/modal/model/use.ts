import { useEffect, useRef } from 'react';

import useModalStore from './store';

function use<MN>(modalNames: MN, onClose?: () => void) {
    const first = useRef(true);

    const openModal = useModalStore.use.openModal();
    const setOpenModal = useModalStore.use.setOpenModal();
    const open = () => {
        setOpenModal(modalNames as string);
    };

    const close = () => setOpenModal(null);

    const isOpen = !!openModal && openModal === modalNames;

    useEffect(() => {
        if (!isOpen && onClose && !first.current) {
            onClose();
        }
        first.current = false;
    }, [isOpen]);

    return { isOpen, open, close };
}

function useConfirm(props: { title: string; callback: (value: boolean) => void }) {
    const openConfirmModal = useModalStore.use.openConfirmModal();
    const confirmModalPayload = useModalStore.use.confirmModalPayload();
    const setOpenConfirmModal = useModalStore.use.setOpenConfirmModal();
    const setConfirmTitle = useModalStore.use.setConfirmTitle();
    const open = () => {
        setOpenConfirmModal(true);
        setConfirmTitle(props.title);
    };

    const close = () => {
        setOpenConfirmModal(false);
        setConfirmTitle('');
    };

    useEffect(() => {
        confirmModalPayload.date && props.callback(!!confirmModalPayload.value);
    }, [confirmModalPayload.date]);

    return { isOpen: openConfirmModal, open, close };
}

export { use, useConfirm };
