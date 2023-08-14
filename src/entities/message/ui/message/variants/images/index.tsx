import React from 'react';

import { BaseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    images: string[];
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { images } = props;

    return (
        <div className={styles.wrapper}>
            {images.map((i, index) => (
                <Image key={index} img={i} width="49%" horizontalImgWidth="100%" height="200px" />
            ))}
        </div>
    );
}

export default ImagesMessage;
