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
    color?: string;
    imageUrl?: string;
    tool?: DrawTools;
};

export type DrawControlProps = {
    color: UseEasyStateReturnType<string>;
    onClose: () => void;
    getResult: (data: { file: File; url: string }) => void;
    tool?: UseEasyStateReturnType<DrawTools>;
};
