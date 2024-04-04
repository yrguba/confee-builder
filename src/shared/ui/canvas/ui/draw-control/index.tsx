import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { blobLocalPath } from '../../../../lib/file-converter';
import Icons from '../../../icons';
import { DrawControlProps } from '../../types';

const DrawControl = forwardRef((props: DrawControlProps, ref: any) => {
    const { color, onClose, getResult, tool, elements, canceledElements } = props;

    const done = () => {
        if (ref.current) {
            new Promise((resolve) => {
                ref.current.toBlob((blob: Blob) => {
                    const url = blobLocalPath(blob);
                    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                    resolve({ url, file });
                }, 'image/jpeg');
            }).then((res) => {
                getResult(res as any);
            });
        }
    };

    const items = [
        { id: 0, icon: null, title: 'Отмена', onClick: onClose },
        {
            id: 1,
            icon: (
                <div className={styles.colorPiker} style={{ backgroundColor: color.value }}>
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
            icon: <Icons.Canvas active={tool?.value === 'circle'} variant="undo" />,
            onClick: () => tool?.set('circle'),
        },
        {
            id: 7,
            icon: <Icons.Canvas active={tool?.value === 'circle'} variant="redo" />,
            onClick: () => tool?.set('circle'),
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
