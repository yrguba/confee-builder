import React, { forwardRef, MouseEvent, useRef } from 'react';

import { useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { DrawCanvasProps, Coords, Tool, Tag } from '../../types';

function drawArrow(ctx: any, fromx: number, fromy: number, tox: number, toy: number, width: number) {
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

function drawRect(ctx: any, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath();
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    ctx.closePath();
    ctx.fill();
}

function drawCircle(ctx: any, x1: number, y1: number, x2: number, y2: number) {
    const y = x2 - x1;
    const x = y2 - y1;
    ctx.beginPath();
    ctx.arc(x1, y1, Math.sqrt(x * x + y * y), 0, 2 * Math.PI, false);
    ctx.stroke();
}

function drawFreeHand(ctx: any, points: Array<[number, number]>) {
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke();
    ctx.closePath();
}

const Draw = forwardRef((props: DrawCanvasProps, ref: any) => {
    const { strokeWidth, size, color = 'black', tool = 'pencil', pushToUndoList, clearRedoList } = props;

    const isDrawing = useEasyState(false);

    const initCoords = useRef({ x: 0, y: 0 });
    const points = useRef<Array<[number, number]>>([[0, 0]]);
    const canvasImg = useRef('');

    const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
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
        if (tool === 'pencil') {
            points.current.push([x, y]);
            return drawFreeHand(ctx, points.current);
        }
    };

    const handleMousemove = (e: MouseEvent<HTMLCanvasElement>) => {
        const canvas = ref.current as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!isDrawing.value || !canvas || !ctx) return null;

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
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.lineWidth = strokeWidth || 12;
            if (tool === 'arrow') {
                return drawArrow(ctx, initCoords.current.x, initCoords.current.y, x, y, strokeWidth || 12);
            }
            if (tool === 'rect') {
                return drawRect(ctx, initCoords.current.x, initCoords.current.y, x, y);
            }
            if (tool === 'circle') {
                return drawCircle(ctx, initCoords.current.x, initCoords.current.y, x, y);
            }
            if (tool === 'pencil') {
                points.current.push([x, y]);
                return drawFreeHand(ctx, points.current);
            }
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
