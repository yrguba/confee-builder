import { ReactNode } from 'react';

export type UseModalReturned = { isOpen: boolean; open: () => void; close: () => void };

export type ModalProps = {
    children: ReactNode;
    onOk?: () => void;
    onClose?: () => void;
    footer?: boolean;
    headerText?: string;
    okText?: string;
    closeText?: string;
} & UseModalReturned;
