import React, { useRef } from 'react';

import { useSize, useGrid } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    images: string[];
} & baseTypes.Statuses;

function UserImagesListView(props: Props) {
    const { images } = props;

    const wrapperRef = useRef(null);

    const { width } = useSize(wrapperRef);

    const { column, row } = useGrid(width, images.length, 200);

    return (
        <div ref={wrapperRef} style={{ gridTemplateColumns: `repeat(${column}, 1fr)`, gridTemplateRows: `repeat(${row}, 200px)` }} className={styles.wrapper}>
            {images.map((img, index) => (
                <div key={index} className={styles.img}>
                    <Image key={index} img={img} />
                </div>
            ))}
        </div>
    );
}

export default UserImagesListView;
