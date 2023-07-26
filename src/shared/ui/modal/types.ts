import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from 'shared/types';

export type UseModalReturned = { isOpen: boolean; open: () => void; close: () => void };

export type ModalProps = {
    children: ReactNode;
    onClose?: () => void;
    width?: number;
} & UseModalReturned &
    BaseTypes.Statuses;
