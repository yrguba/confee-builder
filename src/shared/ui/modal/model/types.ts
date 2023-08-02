import { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';

import { use } from './use';

export type UseReturnedType = ReturnType<typeof use>;

export type BaseModalProps = {
    children: ReactNode;
    onClose?: () => void;
} & UseReturnedType &
    BaseTypes.Statuses;
