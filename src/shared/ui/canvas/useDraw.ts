import { useRef } from 'react';

import { UseDraw } from './types';
import { useEasyState } from '../../hooks';

function useDraw(props: UseDraw) {
    const { onClose, getResult } = props;

    const drawRef = useRef<HTMLCanvasElement>(null);
    const color = useEasyState('black');

    return {
        drawCanvas: {
            color: color.value,
            ref: drawRef,
        },
        drawControl: {
            ref: drawRef,
            color,
            onClose,
            getResult,
        },
    };
}

export default useDraw;
