import React, { memo, useState } from 'react';

import styles from './styles.module.scss';
import { sizeConverter } from '../../../../../lib';
import Title from '../../../../title';
import { ImageCardProps } from '../../types';
import Image from '../base';

function ImageCard(props: ImageCardProps) {
    const { url, size, name } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <Image url={url} width="37px" height="37px" />
            </div>
            <div className={styles.caption}>
                <Title variant="H3M">{name}</Title>
                <Title variant="H4M">{sizeConverter(size)}</Title>
            </div>
        </div>
    );
}
export default ImageCard;
