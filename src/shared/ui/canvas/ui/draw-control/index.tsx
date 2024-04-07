import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { blobLocalPath } from '../../../../lib/file-converter';
import Icons from '../../../icons';
import { DrawControlProps } from '../../types';

const DrawControl = forwardRef((props: DrawControlProps, ref: any) => {
    const { imageUrl, color, onClose, getResult, tool, undoLength, redoLength, redo, undo } = props;

    const done = () => {
        if (ref.current) {
            const canvas = ref.current as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            if (imageUrl && ctx) {
                const canvasImg = canvas.toDataURL();
                const img1 = new Image();
                img1.src = imageUrl;
                img1.onload = () => {
                    const img2 = new Image();
                    img2.src = canvasImg;
                    img2.onload = () => {
                        ctx.drawImage(img1, 0, 0, img1.naturalWidth, img1.naturalHeight);
                        ctx.drawImage(img2, 0, 0, img2.naturalWidth, img2.naturalHeight);
                        canvas.toBlob((b) => {
                            if (!b) return null;
                            const url = blobLocalPath(b);
                            const file = new File([b], 'image.jpg', { type: 'image/jpeg' });
                            getResult({ url, file });
                        });
                    };
                };
            }
        }
    };

    const items = [
        { id: 0, icon: null, title: 'Отмена', onClick: onClose },
        {
            id: 1,
            icon: (
                <div className={styles.colorPiker} style={{ boxShadow: `0 0 8px 2px ${color.value}` }}>
                    <Icons.Canvas variant="color" />
                    <input className={styles.colorPiker_input} type="color" onChange={(e) => color.set(e.target.value)} />
                </div>
            ),
        },
        {
            id: 2,
            icon: <Icons.Canvas active={tool?.value === 'pencil'} variant="pencil" />,
            onClick: () => tool?.set('pencil'),
        },
        {
            id: 3,
            icon: <Icons.Canvas active={tool?.value === 'arrow'} variant="arrow" />,
            onClick: () => tool?.set('arrow'),
        },
        {
            id: 4,
            icon: <Icons.Canvas active={tool?.value === 'rect'} variant="rect" />,
            onClick: () => tool?.set('rect'),
        },
        {
            id: 5,
            icon: <Icons.Canvas active={tool?.value === 'circle'} variant="circle" />,
            onClick: () => tool?.set('circle'),
        },
        {
            id: 6,
            icon: <Icons.Canvas active={undoLength} variant="undo" />,
            onClick: undo,
        },
        {
            id: 7,
            icon: <Icons.Canvas active={redoLength} variant="redo" />,
            onClick: redo,
        },
        { id: 8, icon: null, title: 'Готово', onClick: done, active: true },
    ];

    return (
        <div className={styles.wrapper}>
            {items.map((i) => (
                <div key={i.id} className={styles.item} onClick={i.onClick} style={{ color: i.active ? 'var(--text-action)' : '' }}>
                    {i?.title || i.icon}
                </div>
            ))}
        </div>
    );
});

export default DrawControl;
