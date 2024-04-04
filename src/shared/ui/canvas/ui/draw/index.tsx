import React, { forwardRef, MouseEvent, MouseEventHandler, useEffect, useLayoutEffect, useRef } from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import rough from 'roughjs';
import { Drawable, Options } from 'roughjs/bin/core';

import { useArray, useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { blobLocalPath } from '../../../../lib/file-converter';
import { DrawCanvasProps, Coords, Tool, Tag } from '../../types';

const generator = rough.generator();

const MAX_ELEMENTS = 5;

export type DrawingProps = {
    coords: Coords;
    tool: Tool;
    options: Options;
    points?: Array<[number, number]>;
    tag: Tag;
};

function canvas_arrow(ctx: any, fromx: number, fromy: number, tox: number, toy: number) {
    const x_center = tox;
    const y_center = toy;
    const r = 50;
    let angle;
    let x;
    let y;
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();
    angle = Math.atan2(toy - fromy, tox - fromx);
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;
    ctx.moveTo(x, y);
    angle += (1 / 3) * (2 * Math.PI);
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;
    ctx.lineTo(x, y);
    angle += (1 / 3) * (2 * Math.PI);
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
}

function drawing(props: DrawingProps) {
    const { options, tool, coords, points, tag } = props;

    const { x1, y1, x2, y2 } = coords;

    switch (tool) {
        case 'arrow':
            return { tag, coords, points, el: generator.line(x1, y1, x2, y2, options) };
        case 'rect':
            return { tag, coords, points, el: generator.rectangle(x1, y1, x2 - x1, y2 - y1, options) };
        case 'circle':
            return { tag, coords, points, el: generator.circle(x1, y1, (x2 - x1) * 2, options) };
        case 'pencil':
            if (points) {
                return { tag, coords, points, el: generator.linearPath(points, options) };
            }
            return;
        default:
            throw Error();
    }
}

const Draw = forwardRef((props: DrawCanvasProps, ref: any) => {
    const { size, color = 'black', imageUrl, tool = 'pencil', elements } = props;

    const newImg = useEasyState('');

    const options = {
        stroke: color,
        fillStyle: color,
        roughness: 0,
        strokeWidth: 10,
    };

    const isDrawing = useEasyState(false);

    useLayoutEffect(() => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const roughCanvas = rough.canvas(canvas);
        if (ctx && elements?.value) {
            ctx.clearRect(0, 0, size.naturalWidth, size.naturalHeight);
            if (elements.value.length > MAX_ELEMENTS) {
                canvas.toBlob((blob) => {
                    if (blob) {
                        newImg.set(blobLocalPath(blob));
                    }
                }, 'image/jpeg');
                const updArr = [...elements.value];
                updArr.splice(0, MAX_ELEMENTS);
                elements.set(updArr);
            }
            elements.value.forEach((i) => {
                if (i.tag === 'rough') {
                    roughCanvas.draw(i.el);
                }
                if (i.tag === 'arrow') {
                    canvas_arrow(ctx, i.coords.x1, i.coords.y1, i.coords.x2, i.coords.y2);
                    ctx.fillStyle = color;
                    ctx.lineWidth = 30;
                    ctx.stroke();
                }
            });
        }
    }, [elements?.value]);

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
            points: tool === 'pencil' ? [[x, y]] : [[0, 0]],
            tool,
            options,
            tag: tool === 'arrow' ? 'arrow' : 'rough',
        });
        elements?.set((prev) => [...prev, el]);
    };

    const handleMousemove = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        if (!isDrawing.value || !canvas || !elements?.value) return null;

        const canvasRect = canvas.getBoundingClientRect();
        const { clientX, clientY } = e;

        const x = ((clientX - canvasRect.left) * size.naturalWidth) / size.containedWidth;
        const y = ((clientY - canvasRect.top) * size.naturalHeight) / size.containedHeight;
        const index = elements.value.length - 1;
        const lastEl = elements.value[index];

        const updEl = drawing({
            coords: { x1: lastEl.coords.x1, y1: lastEl.coords.y1, x2: x, y2: y },
            points: tool === 'pencil' ? [...lastEl.points, [x, y]] : [[0, 0]],
            tool,
            options,
            tag: tool === 'arrow' ? 'arrow' : 'rough',
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
                backgroundImage: `url(${newImg || imageUrl})`,
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
