import { useRef } from 'react';

import { DrawTools, UseDraw, Item } from './types';
import { useEasyState } from '../../hooks';

function useDraw(props: UseDraw) {
    const { onClose, getResult } = props;

    const drawRef = useRef<HTMLCanvasElement>(null);
    const color = useEasyState('black');
    const tools = useEasyState<DrawTools>('pencil');

    const elements = useEasyState<Array<Item>>([]);
    const canceledElements = useEasyState<Array<Item>>([]);

    return {
        drawCanvas: {
            color: color.value,
            ref: drawRef,
            tools: tools.value,
            elements,
        },
        drawControl: {
            ref: drawRef,
            color,
            onClose,
            getResult,
            tools,
            elements,
            canceledElements,
        },
    };
}

export default useDraw;
