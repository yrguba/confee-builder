import React, { forwardRef, useEffect, useRef } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';

import { useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { DrawCanvasProps } from '../../types';

const Draw = forwardRef((props: DrawCanvasProps, ref: any) => {
    const { width, height, color = 'black', imageUrl } = props;

    const background = useRef(false);
    const isDrawing = useEasyState(false);

    // useEffect(() => {
    //     if (ref?.current) {
    //         ref.current.height = height;
    //         ref.current.width = width;
    //     }
    // }, [width, height]);

    useEffect(() => {
        if (ref.current) {
            const canvas = ref.current as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            let y = 1;
            window.addEventListener('wheel', (e) => {
                if (e.deltaY < 0) {
                    if (context) {
                        console.log(y);
                        context.transform(21, 20, 21.7, 12, 20, 20);
                        y += 1;
                    }
                } else {
                }
            });
        }
    }, [ref.current]);

    useEffect(() => {
        if (ref?.current && !background.current) {
            const canvas = ref.current;
            const context = canvas.getContext('2d');
            if (context) {
                if (imageUrl) {
                    const bgImg = new Image();
                    bgImg.src = imageUrl;
                    bgImg.onload = (e) => {
                        canvas.width = bgImg.naturalWidth; // actual size given with integer values
                        canvas.height = bgImg.naturalHeight;
                        context.drawImage(e.target, 0, 0, bgImg.naturalWidth, bgImg.naturalHeight);
                    };
                } else {
                    context.fillStyle = 'white';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                }
            }
        }
    }, [ref.current, imageUrl]);

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
    const scale = useRef<any>(1);
    return (
        <canvas
            onMouseDown={start}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            style={{ cursor: isDrawing ? 'crosshair' : 'auto' }}
            className={styles.wrapper}
            ref={ref}
        />
    );
});

export default Draw;
