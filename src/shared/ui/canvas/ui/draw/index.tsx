import React, { forwardRef } from 'react';

import { useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { DrawCanvasProps } from '../../types';

const Draw = forwardRef((props: DrawCanvasProps, ref: any) => {
    const { width = '100%', height = '100%', color = 'black' } = props;

    const isDrawing = useEasyState(false);

    const start = (e: any) => {
        if (ref?.current) {
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

    const draw = (e: any) => {
        if (ref?.current && isDrawing.value) {
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

    const stopDraw = (e: any) => {
        if (ref?.current && isDrawing.value) {
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
    return (
        <canvas
            onMouseDown={start}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            style={{ cursor: isDrawing ? 'crosshair' : 'auto' }}
            className={styles.drawCanvas}
            ref={ref}
            width={width}
            height={height}
        />
    );
});

export default Draw;
