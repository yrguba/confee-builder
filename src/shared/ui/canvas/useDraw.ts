import { useRef } from 'react';

import { Tool, UseDraw, Item } from './types';
import { useEasyState } from '../../hooks';

function useDraw(props: UseDraw) {
    const { imageUrl, onClose, getResult } = props;

    const drawRef = useRef<HTMLCanvasElement>(null);
    const color = useEasyState('black');
    const tool = useEasyState<Tool>('pencil');

    const elements = useEasyState<Array<Item>>([]);
    const canceledElements = useEasyState<Array<Item>>([]);

    return {
        drawCanvas: {
            color: color.value,
            ref: drawRef,
            tool: tool.value,
            elements,
        },
        drawControl: {
            ref: drawRef,
            color,
            onClose,
            getResult,
            tool,
            elements,
            canceledElements,
            imageUrl,
        },
    };
}

export default useDraw;
