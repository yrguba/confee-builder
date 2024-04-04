import React, { forwardRef, MouseEvent, MouseEventHandler, useEffect, useLayoutEffect, useRef } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import rough from 'roughjs';
import { Drawable } from 'roughjs/bin/core';

import { useArray, useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { DrawCanvasProps } from '../../types';

const generator = rough.generator();

type Item = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    el: Drawable;
};

function createElement(x1: number, y1: number, x2: number, y2: number) {
    const roughElement = generator.line(x1, y1, x2, y2);
    return { x1, y1, x2, y2, el: roughElement };
}

const Draw = forwardRef((props: DrawCanvasProps, ref: any) => {
    const { size, color = 'black', imageUrl } = props;

    const isDrawing = useEasyState(false);
    const elements = useEasyState<Array<Item>>([]);

    useLayoutEffect(() => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const roughCanvas = rough.canvas(canvas);

        if (ctx) {
            ctx.clearRect(0, 0, size.naturalWidth, size.containedHeight);
            elements.value.forEach((i) => roughCanvas.draw(i.el));
        }
    }, [elements.value]);

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        if (!canvas) return null;
        isDrawing.set(true);
        const canvasRect = canvas.getBoundingClientRect();
        const { clientX, clientY } = e;
        const x = clientX - canvasRect.left;
        const y = clientY - canvasRect.top;
        const el = createElement(clientX, clientY, clientX, clientY);
        elements.set((prev) => [...prev, el]);
    };

    const handleMousemove = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        if (!isDrawing.value || !canvas) return null;
        const canvasRect = canvas.getBoundingClientRect();
        const { clientX, clientY } = e;
        const x = clientX - canvasRect.left;
        const y = clientY - canvasRect.top;
        const index = elements.value.length - 1;
        const lastEl = elements.value[index];
        const updEl = createElement(lastEl.x1, lastEl.y1, clientX - canvasRect.left, clientY - canvasRect.top);
        const copyEls = [...elements.value];
        copyEls[index] = updEl;
        elements.set(copyEls);
    };

    const handleMouseup = (e: MouseEvent<HTMLCanvasElement>) => {
        // isDrawing.set(false);
    };

    return (
        <canvas
            onMouseDown={handleMouseDown}
            onMouseMove={handleMousemove}
            onMouseUp={handleMouseup}
            style={{
                // backgroundImage: `url(${imageUrl})`,
                backgroundColor: 'white',
                width: size.containedWidth,
                height: size.containedHeight,
            }}
            className={styles.wrapper}
            ref={ref}
            width={size.naturalWidth}
            height={size.naturalHeight}
        >
            canvas
        </canvas>
    );
});

export default Draw;
