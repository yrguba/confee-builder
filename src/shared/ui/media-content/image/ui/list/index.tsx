import React, { memo, useState } from 'react';

import styles from './styles.module.scss';
import { ImagesListProps } from '../../types';
import Image from '../base';

function ImageList(props: ImagesListProps) {
    const { items, style } = props;

    return (
        <div className={styles.wrapper} style={style}>
            {items?.map((i) => (
                <Image key={i.id} {...i} borderRadius={false} />
            ))}
        </div>
    );
}
export default ImageList;
