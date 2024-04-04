import { Drawable, Options } from 'roughjs/bin/core';

import { UseEasyStateReturnType } from '../../hooks';

export type DrawTools = 'pencil';

export type UseDraw = {
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
    elements?: UseEasyStateReturnType<Item[]>;
    color?: string;
    imageUrl?: string;
    tool?: DrawTools;
};

export type DrawControlProps = {
    elements?: UseEasyStateReturnType<Item[]>;
    canceledElements?: UseEasyStateReturnType<Item[]>;
    color: UseEasyStateReturnType<string>;
    onClose: () => void;
    getResult: (data: { file: File; url: string }) => void;
    tool?: UseEasyStateReturnType<DrawTools>;
};

export type Tool = 'line' | 'rectangle' | 'ellipse' | 'circle' | 'pencil';

export type Coords = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export type Item = {
    coords: Coords;
    points: Array<[number, number]>;
    el: Drawable;
};

export type DrawingProps = {
    coords: Coords;
    tool: Tool;
    options: Options;
    points?: Array<[number, number]>;
};
