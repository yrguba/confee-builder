import React from 'react';

import { BaseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';
import { appTypes } from '../../../../../app';
import { File } from '../../../../model/types';

type Props = {
    images: File[];
    clickImage: (data: appTypes.ImagesSwiperProps) => void;
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { images, clickImage } = props;

    return (
        <div className={styles.wrapper}>
            <Image.List
                items={images?.map((i, index) => ({
                    id: index,
                    img: i.link || '',
                    width: '49%',
                    horizontalImgWidth: '99%',
                    height: '200px',
                }))}
            />
            {/* {images.map((i, index) => ( */}
            {/*    <Image */}
            {/*        onClick={() => clickImage({ images: images.map((a) => a.link), startIndex: index })} */}
            {/*        key={index} */}
            {/*        img={i.link} */}
            {/*        width="49%" */}
            {/*        horizontalImgWidth="100%" */}
            {/*        height="200px" */}
            {/*    /> */}
            {/* ))} */}
        </div>
    );
}

export default ImagesMessage;
