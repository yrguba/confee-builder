import { ReactNode, CSSProperties } from 'react';

import { BaseTypes } from '../../types';

export type CollapseProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
    isOpen?: boolean;
    openByClickingOnArrow?: boolean;
    onTitleClick?: (arg: string) => void;
    activeAnimate?: boolean;
    openClose?: (value: boolean) => void;
    headerStyle?: CSSProperties;
    childStyle?: CSSProperties;
} & BaseTypes.Statuses;
