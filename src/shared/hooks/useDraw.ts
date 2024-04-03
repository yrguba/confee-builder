import React, { RefObject, useRef } from 'react';

import styles from '../../entities/app/ui/modals/photo-video-swiper/styles.module.scss';

import { useEasyState } from './index';

type Props = {
    ref: RefObject<HTMLCanvasElement>;
    color?: string;
};

function useDraw(props: Props) {
    const { ref, color = 'black' } = props;

    const isDrawing = useEasyState(false);

    const onMouseDown = (e: any) => {
        if (ref.current) {
            const canvas = ref.current;
            const context = canvas.getContext('2d');
            if (context) {
                const clientRect = canvas.getBoundingClientRect();
                isDrawing.set(true);
                context.beginPath();
                context.moveTo(e.clientX - clientRect.left, e.clientY - clientRect.top);
                e.preventDefault();
            }
        }
    };

    const onMouseMove = (e: any) => {
        if (ref.current && isDrawing.value) {
            const canvas = ref.current;
            const context = canvas.getContext('2d');
            if (context) {
                const clientRect = canvas.getBoundingClientRect();
                context.lineTo(e.clientX - clientRect.left, e.clientY - clientRect.top);
                context.strokeStyle = color;
                context.lineWidth = 3;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.stroke();
                e.preventDefault();
            }
        }
    };

    const onMouseUp = (e: any) => {
        if (ref.current && isDrawing.value) {
            const canvas = ref.current;
            const context = canvas.getContext('2d');
            if (context) {
                context.stroke();
                context.closePath();
                isDrawing.set(false);
                e.preventDefault();
            }
        }
    };

    return { canvasAttrs: { onMouseDown, onMouseMove, onMouseUp }, isDrawing };
}

export default useDraw;
