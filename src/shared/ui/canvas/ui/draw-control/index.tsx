import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { blobLocalPath } from '../../../../lib/file-converter';
import { DrawControlProps } from '../../types';

const DrawControl = forwardRef((props: DrawControlProps, ref: any) => {
    const { color, onClose, getResult, tool } = props;

    const done = () => {
        if (ref.current) {
            new Promise((resolve) => {
                ref.current.toBlob(
                    (blob: Blob) => {
                        const url = blobLocalPath(blob);
                        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                        resolve({ url, file });
                    },
                    'image/jpeg',
                    1000
                );
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
                    <input className={styles.colorPiker_input} type="color" onChange={(e) => color.set(e.target.value)} />
                </div>
            ),
        },
        { id: 2, icon: null, title: 'Готово', onClick: done, active: true },
    ];

    return (
        <div className={styles.wrapper}>
            {items.map((i) => (
                <div key={i.id} className={styles.item} onClick={i.onClick}>
                    {i?.title || i.icon}
                </div>
            ))}
        </div>
    );
});

export default DrawControl;
