import { useRef } from 'react';

import { UseDraw } from './types';
import { useEasyState } from '../../hooks';

function useDraw(props: UseDraw) {
    const { onClose } = props;

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
        },
    };
}

export default useDraw;
