import { ReactNode, CSSProperties } from 'react';

export type CollapseProps = {
    title: string;
    titleClassName?: string;
    headerClassName?: string;
    children: ReactNode;
    openByClickingOnArrow?: boolean;
    onTitleClick?: (arg: string) => void;
    activeAnimate?: boolean;
};
