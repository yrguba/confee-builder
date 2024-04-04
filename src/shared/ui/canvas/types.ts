import { UseEasyStateReturnType } from '../../hooks';

export type UseDraw = {
    onClose: () => void;
    getResult: (data: { file: File; url: string }) => void;
};

export type DrawCanvasProps = {
    size: {
        naturalWidth?: string | number;
        naturalHeight?: string | number;
        containedWidth?: string | number;
        containedHeight?: string | number;
    };
    color?: string;
    imageUrl?: string;
};

export type DrawControlProps = {
    color: UseEasyStateReturnType<string>;
    onClose: () => void;
    getResult: (data: { file: File; url: string }) => void;
};
