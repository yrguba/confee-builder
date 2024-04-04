import React, { forwardRef, MouseEvent, MouseEventHandler, useEffect, useLayoutEffect, useRef } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import rough from 'roughjs';
import { Drawable, Options } from 'roughjs/bin/core';

import { useArray, useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { DrawCanvasProps } from '../../types';

const generator = rough.generator();

type Tool = 'line' | 'rectangle' | 'ellipse' | 'circle' | 'pencil';

type Coords = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

type Item = {
    coords: Coords;
    points: Array<[number, number]>;
    el: Drawable;
};

type DrawingProps = {
    coords: Coords;
    tool: Tool;
    options: Options;
    points?: Array<[number, number]>;
};

function drawing(props: DrawingProps) {
    const { options, tool, coords, points } = props;

    const { x1, y1, x2, y2 } = coords;
    switch (tool) {
        case 'line':
            return { coords, points, el: generator[tool](x1, y1, x2, y2, options) };
        case 'rectangle':
            return { coords, points, el: generator[tool](x1, y1, x2 - x1, y2 - y1, options) };
        case 'pencil':
            if (points) {
                return { coords, points, el: generator.linearPath(points, options) };
            }
            return;
        default:
            throw Error();
    }
}

const Draw = forwardRef((props: DrawCanvasProps, ref: any) => {
    const { size, color = 'black', imageUrl, tool = 'pencil' } = props;

    const options = {
        stroke: color,
        fillStyle: color,
        roughness: 0,
        strokeWidth: 100,
        disableMultiStrokeFill: true,
        curveFitting: 0,
    };

    const isDrawing = useEasyState(false);
    const elements = useEasyState<Array<Item>>([]);

    useLayoutEffect(() => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const roughCanvas = rough.canvas(canvas);
        if (ctx) {
            // ctx.clearRect(0, 0, size.naturalWidth, size.naturalHeight);
            elements.value.forEach((i) => roughCanvas.draw(i.el));
        }
    }, [elements.value]);

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        if (!canvas) return null;
        isDrawing.set(true);
        const canvasRect = canvas.getBoundingClientRect();
        const { clientX, clientY } = e;
        const x = ((clientX - canvasRect.left) * size.naturalWidth) / size.containedWidth;
        const y = ((clientY - canvasRect.top) * size.naturalHeight) / size.containedHeight;
        const el = drawing({
            coords: { x1: x, x2: x, y1: y, y2: y },
            points: [[x, y]],
            tool,
            options,
        });
        elements.set((prev) => [...prev, el]);
    };
    console.log(elements.value);
    const handleMousemove = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        if (!isDrawing.value || !canvas) return null;

        const canvasRect = canvas.getBoundingClientRect();
        const { clientX, clientY } = e;

        const x = ((clientX - canvasRect.left) * size.naturalWidth) / size.containedWidth;
        const y = ((clientY - canvasRect.top) * size.naturalHeight) / size.containedHeight;
        const index = elements.value.length - 1;
        const lastEl = elements.value[index];

        const updEl = drawing({
            coords: { x1: lastEl.coords.x1, y1: lastEl.coords.y1, x2: x, y2: y },
            points: [...lastEl.points, [x, y]],
            tool,
            options,
        });
        const copyEls: any = [...elements.value];
        copyEls[index] = updEl;
        elements.set(copyEls);
    };

    const handleMouseup = (e: MouseEvent<HTMLCanvasElement>) => {
        isDrawing.set(false);
    };

    return (
        <canvas
            onMouseDown={handleMouseDown}
            onMouseMove={handleMousemove}
            onMouseUp={handleMouseup}
            style={{
                backgroundImage: `url(${imageUrl})`,
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
