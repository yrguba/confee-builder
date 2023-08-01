import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Image } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../../model/types';

type Props = {
    images: string[];
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { images } = props;

    return (
        <div className={styles.wrapper}>
            {images.map((i, index) => (
                <Image img={i} width={index % 3 === 0 ? '100%' : '50%'} height="200px" />
            ))}
        </div>
    );
}

export default ImagesMessage;
