import { RefObject } from 'react';

import { UseEasyStateReturnType } from '../../hooks';

export type UseDraw = {
    onClose: () => void;
};

export type DrawCanvasProps = {
    width?: string | number;
    height?: string | number;
    color?: string;
};

export type DrawControlProps = {
    color: UseEasyStateReturnType<string>;
    onClose: () => void;
};
