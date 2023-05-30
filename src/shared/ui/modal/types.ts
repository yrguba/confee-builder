import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

export type UseModalReturned = { isOpen: boolean; open: () => void; close: () => void };

export type ModalProps = {
    children: ReactNode;
    onOk?: () => void;
    onClose?: () => void;
    footer?: boolean;
    headerText?: string;
    okText?: string;
    okStyle?: CSSProperties;
    closeText?: string;
    width?: number;
    closeIcon?: boolean;
} & UseModalReturned &
    BaseTypes.Statuses;
