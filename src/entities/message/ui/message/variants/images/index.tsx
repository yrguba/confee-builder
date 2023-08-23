import React, { memo } from 'react';

import { BaseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';
import { useRendersCount } from '../../../../../../shared/hooks';
import { appTypes } from '../../../../../app';
import { File } from '../../../../model/types';

type Props = {
    images: File[];
    clickImage: (data: appTypes.ImagesSwiperProps) => void;
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { images, clickImage } = props;
    console.log('ImagesMessage', useRendersCount());
    return (
        <div className={styles.wrapper}>
            <Image.List
                items={images?.map((i, index) => ({
                    id: index,
                    url: i.link || '',
                    width: '49%',
                    horizontalImgWidth: '99%',
                    height: '200px',
                }))}
            />
        </div>
    );
}

// export default memo(ImagesMessage, (prevProps, nextProps): any => {
//     if (prevProps.images[0].id === nextProps.images[0].id) return true;
// });
export default ImagesMessage;
