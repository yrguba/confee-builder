import { ReactNode, CSSProperties } from 'react';

export type CollapseProps = {
    title: string;
    titleClassName?: string;
    headerClassName?: string;
    children: ReactNode;
    isOpen?: boolean;
    openByClickingOnArrow?: boolean;
    onTitleClick?: (arg: string) => void;
    activeAnimate?: boolean;
};
