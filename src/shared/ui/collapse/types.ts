import { ReactNode, CSSProperties } from 'react';

export type CollapseProps = {
    title: string;
    titleClassName?: string;
    children: ReactNode;
    openByClickingOnArrow?: boolean;
    onTitleClick?: (arg: string) => void;
    activeAnimate?: boolean;
};
