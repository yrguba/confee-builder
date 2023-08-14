import React from 'react';

import { BaseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';
import { appTypes } from '../../../../../app';

type Props = {
    images: string[];
    clickImage: (data: appTypes.ImagesSwiperProps) => void;
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { images, clickImage } = props;

    return (
        <div className={styles.wrapper}>
            {images.map((i, index) => (
                <Image onClick={() => clickImage({ images, startIndex: index })} key={index} img={i} width="49%" horizontalImgWidth="100%" height="200px" />
            ))}
        </div>
    );
}

export default ImagesMessage;
