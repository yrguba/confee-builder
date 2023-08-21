import { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

import { use } from './use';

export type UseReturnedType = ReturnType<typeof use>;

export type BaseModalProps = {
    children: ReactNode;
    onClose?: () => void;
    closeIcon?: boolean;
} & UseReturnedType &
    BaseTypes.Statuses;

export type ConfirmModalProps = {
    title: string;
    subtitle?: string;
    okText?: string;
    closeText?: string;
    onClose?: () => void;
    callback: (value: boolean) => void;
} & UseReturnedType &
    BaseTypes.Statuses;
