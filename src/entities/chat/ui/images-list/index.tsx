import React, { useRef } from 'react';

import { useSize, useGrid } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    images: string[];
    gap?: number;
    imgSize?: number;
    hardGrid?: boolean;
} & baseTypes.Statuses;

function ChatImagesListView(props: Props) {
    const { images, imgSize = 200, gap, hardGrid } = props;

    const wrapperRef = useRef(null);

    const { width } = useSize(wrapperRef);

    const { column, row } = useGrid(width, images.length, imgSize);

    const getStyles = () => {
        if (hardGrid) {
            return { gap, gridTemplateColumns: `repeat(${3}, ${imgSize}px)`, gridTemplateRows: `repeat(${row + 1}, ${imgSize}px)` };
        }
        return { gap, gridTemplateColumns: `repeat(${column}, 1fr)`, gridTemplateRows: `repeat(${row}, 200px)` };
    };

    return (
        <div ref={wrapperRef} style={getStyles()} className={styles.wrapper}>
            {images.map((img, index) => (
                <div key={index} className={styles.img}>
                    <Image key={index} img={img} />
                </div>
            ))}
        </div>
    );
}

export default ChatImagesListView;
