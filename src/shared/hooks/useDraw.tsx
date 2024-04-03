import React, { RefObject, useRef } from 'react';

import styles from '../../entities/app/ui/modals/photo-video-swiper/styles.module.scss';

import { useEasyState, UseEasyStateReturnType } from './index';

type Props = {
    width: string | number;
    height: string | number;
};

function useDraw(props: Props) {
    const { width = '100%', height = '100%' } = props;
    const color = useEasyState('black');

    // const drawControlItems = [
    //     { id: 0, icon: null, title: 'Отмена', onClick: () => activeDraw.set(false) },
    //     {
    //         id: 1,
    //         icon: (
    //             <div className={styles.colorPiker} style={{ backgroundColor: color.value }}>
    //                 <input className={styles.colorPiker_input} type="color" onChange={(e) => color.set(e.target.value)} />
    //             </div>
    //         ),
    //         onClick: () => rotate.set(rotate.value + 20),
    //     },
    //     { id: 2, icon: null, title: 'Готово', onClick: onCrop, active: true },
    // ];

    const drawControl = <DrawControlFn />;
    const drawCanvas = <DrawCanvasFn width={width} height={height} color={color.value} />;

    return { drawControl, drawCanvas };
}

function DrawControlFn() {
    return <div>DrawControl</div>;
}

type DrawCanvasFnProps = {
    color: string;
} & Props;

function DrawCanvasFn({ color, width, height }: DrawCanvasFnProps) {
    const ref = useRef<HTMLCanvasElement>(null);

    const isDrawing = useEasyState(false);
    const start = (e: any) => {
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

    const draw = (e: any) => {
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

    const stopDraw = (e: any) => {
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
}

export default useDraw;
