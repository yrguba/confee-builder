import { useRef } from 'react';

import { DrawTools, UseDraw } from './types';
import { useEasyState } from '../../hooks';

function useDraw(props: UseDraw) {
    const { onClose, getResult } = props;

    const drawRef = useRef<HTMLCanvasElement>(null);
    const color = useEasyState('black');
    const tools = useEasyState<DrawTools>('pencil');

    return {
        drawCanvas: {
            color: color.value,
            ref: drawRef,
            tools: tools.value,
        },
        drawControl: {
            ref: drawRef,
            color,
            onClose,
            getResult,
            tools,
        },
    };
}

export default useDraw;
