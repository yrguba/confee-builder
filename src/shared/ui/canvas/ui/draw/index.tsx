import React, { forwardRef, MouseEvent, useRef } from 'react';
import rough from 'roughjs';
import { Options } from 'roughjs/bin/core';

import { useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { DrawCanvasProps, Coords, Tool, Tag } from '../../types';

const generator = rough.generator();

export type DrawingProps = {
    coords: Coords;
    tool: Tool;
    options: Options;
    points?: Array<[number, number]>;
};

function canvas_arrow(ctx: any, fromx: number, fromy: number, tox: number, toy: number, width: number) {
    const r = width * 2;
    const x_center = tox;
    const y_center = toy;
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
    const { options, tool, coords, points } = props;

    const { x1, y1, x2, y2 } = coords;

    switch (tool) {
        case 'rect':
            return generator.rectangle(x1, y1, x2 - x1, y2 - y1, options);
        case 'circle':
            const y = x2 - x1;
            const x = y2 - y1;
            return generator.circle(x1, y1, Math.sqrt(x * x + y * y) * 2, options);
        case 'pencil':
            if (points) {
                return generator.linearPath(points, options);
            }
            return;
        default:
            throw Error();
    }
}

const Draw = forwardRef((props: DrawCanvasProps, ref: any) => {
    const { strokeWidth, size, color = 'black', tool = 'pencil', pushToUndoList, clearRedoList } = props;

    const isDrawing = useEasyState(false);

    const initCoords = useRef({ x: 0, y: 0 });
    const points = useRef<Array<[number, number]>>([[0, 0]]);
    const canvasImg = useRef('');

    const options = {
        stroke: color,
        fillStyle: color,
        roughness: 0,
        strokeWidth,
    };

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        const roughCanvas = rough.canvas(canvas);
        if (!canvas || !ctx) return null;
        clearRedoList && clearRedoList();
        pushToUndoList && pushToUndoList(canvas.toDataURL());

        ctx.beginPath();
        isDrawing.set(true);
        const canvasRect = canvas.getBoundingClientRect();
        const { clientX, clientY } = e;
        const x = ((clientX - canvasRect.left) * size.naturalWidth) / size.containedWidth;
        const y = ((clientY - canvasRect.top) * size.naturalHeight) / size.containedHeight;
        canvasImg.current = canvas.toDataURL();
        initCoords.current = { x, y };
        points.current = [[x, y]];
        if (tool === 'arrow') {
            return canvas_arrow(ctx, x, y, x, y, strokeWidth || 12);
        }
        const el = drawing({
            coords: { x1: x, x2: x, y1: y, y2: y },
            points: [[x, y]],
            tool,
            options,
        });
        el && roughCanvas.draw(el);
    };

    const handleMousemove = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!isDrawing.value || !canvas || !ctx) return null;

        const roughCanvas = rough.canvas(canvas);
        const canvasRect = canvas.getBoundingClientRect();
        const { clientX, clientY } = e;

        const x = ((clientX - canvasRect.left) * size.naturalWidth) / size.containedWidth;
        const y = ((clientY - canvasRect.top) * size.naturalHeight) / size.containedHeight;

        const img = new Image();
        img.src = canvasImg.current;
        img.onload = () => {
            ctx.clearRect(0, 0, size.naturalWidth, size.naturalHeight);
            ctx.drawImage(img, 0, 0, size.naturalWidth, size.naturalHeight);
            ctx.beginPath();
            if (tool === 'arrow') {
                ctx.strokeStyle = color;
                ctx.fillStyle = color;
                ctx.lineWidth = strokeWidth || 12;
                return canvas_arrow(ctx, initCoords.current.x, initCoords.current.y, x, y, strokeWidth || 12);
            }
            if (tool === 'pencil') {
                points.current.push([x, y]);
            }
            const el = drawing({
                coords: { x1: initCoords.current.x, y1: initCoords.current.y, x2: x, y2: y },
                points: points.current,
                tool,
                options,
            });
            el && roughCanvas.draw(el);
        };
    };

    const handleMouseup = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.closePath();
        isDrawing.set(false);
    };
    return (
        <canvas
            onMouseDown={handleMouseDown}
            onMouseMove={handleMousemove}
            onMouseUp={handleMouseup}
            style={{
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
