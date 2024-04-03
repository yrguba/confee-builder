import React, { forwardRef } from 'react';

import { useEasyState } from 'shared/hooks';

import styles from './styles.module.scss';
import { DrawControlProps } from '../../types';

const DrawControl = forwardRef((props: DrawControlProps, ref: any) => {
    const { color, onClose } = props;

    const isDrawing = useEasyState(false);

    const items = [
        { id: 0, icon: null, title: 'Отмена', onClick: onClose },
        // {
        //     id: 1,
        //     icon: (
        //         <div className={styles.colorPiker} style={{ backgroundColor: color.value }}>
        //             <input className={styles.colorPiker_input} type="color" onChange={(e) => color.set(e.target.value)} />
        //         </div>
        //     ),
        // },
        // { id: 2, icon: null, title: 'Готово', onClick: onCrop, active: true },
    ];

    return (
        <div className={styles.wrapper}>
            {items.map((i) => (
                <div className={styles.item} onClick={i.onClick}>
                    {i?.title || i.icon}
                </div>
            ))}
        </div>
    );
});

export default DrawControl;
