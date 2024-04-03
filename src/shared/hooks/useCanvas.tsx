import React, { useRef } from 'react';

import styles from '../../entities/app/ui/modals/photo-video-swiper/styles.module.scss';

import { useEasyState } from './index';

type Props = {
    width: string | number;
    height: string | number;
};

function useCanvas(props: Props) {
    const drawRef = useRef<HTMLCanvasElement>(null);

    const color = useEasyState('black');
    const isDrawing = useEasyState(false);

    const start = (e: any) => {
        if (drawRef.current) {
            const canvas = drawRef.current;
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

    const draw = (e: any) => {
        if (drawRef.current && isDrawing.value) {
            const canvas = drawRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                const clientRect = canvas.getBoundingClientRect();
                context.lineTo(e.clientX - clientRect.left, e.clientY - clientRect.top);
                context.strokeStyle = color.value;
                context.lineWidth = 3;
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.stroke();
                e.preventDefault();
            }
        }
    };

    const stopDraw = (e: any) => {
        if (drawRef.current && isDrawing.value) {
            const canvas = drawRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                context.stroke();
                context.closePath();
                isDrawing.set(false);
                e.preventDefault();
            }
        }
    };

    return (
        <canvas
            style={{ cursor: isDrawing ? 'crosshair' : 'auto' }}
            onMouseDown={start}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            className={styles.draw}
            ref={drawRef}
            width={props.width}
            height={props.height}
        />
    );
}

export default useCanvas;
