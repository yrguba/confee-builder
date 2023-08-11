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

export type UseConfirmProps<T = any> = {
    title: string;
    subtitle?: string;
    okText?: string;
    closeText?: string;
    callback: (value: boolean, callbackData: T) => void;
};
