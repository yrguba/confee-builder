import { UseEasyStateReturnType } from '../../hooks';

export type Tool = 'arrow' | 'rect' | 'circle' | 'pencil';
export type Tag = 'rough' | 'arrow';
export type UseDraw = {
    imageUrl?: string;
    onClose: () => void;
    getResult: (data: { file: File; url: string }) => void;
};

export type DrawCanvasProps = {
    size: {
        naturalWidth: number;
        naturalHeight: number;
        containedWidth: number;
        containedHeight: number;
    };
    color?: string;
    tool?: Tool;
    pushToUndoList?: (src: string) => void;
    clearRedoList?: () => void;
    strokeWidth?: number;
};

export type DrawControlProps = {
    imageUrl?: string;
    undoLength?: boolean;
    redoLength?: boolean;
    undo?: () => void;
    redo?: () => void;
    color: UseEasyStateReturnType<string>;
    onClose: () => void;
    getResult: (data: { file: File; url: string }) => void;
    tool?: UseEasyStateReturnType<Tool>;
    strokeWidth?: UseEasyStateReturnType<number>;
};

export type Coords = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};
