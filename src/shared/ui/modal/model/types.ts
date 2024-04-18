import { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

import { use, useConfirm } from './use';

export type ScrollPosition = { top: number; bottom: number; left: number; right: number };

export type UseReturnedType<T = any> = {
    open: (data?: T) => void;
    close: () => void;
    isOpen: boolean;
    onClose?: () => void;
    payload: T;
    scrollPosition?: ScrollPosition;
};
export type UseConfirmReturnedType = ReturnType<typeof useConfirm>;

export type BaseModalProps = {
    children: ReactNode;
    onClose?: () => void;
    closeIcon?: boolean;
    centered?: boolean;
    full?: boolean;
    setScrollPosition?: (data: ScrollPosition) => void;
} & UseReturnedType &
    BaseTypes.Statuses;

export type ConfirmModalProps = {
    title?: string;
    subtitle?: string;
    okText?: string;
    closeText?: string;
    onClose?: () => void;
    callback: (value: boolean) => void;
    callbackData: any;
    isOpen: boolean;
    close: any;
    open: any;
} & BaseTypes.Statuses;
