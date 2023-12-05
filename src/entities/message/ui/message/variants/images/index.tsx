import React from 'react';

import { useEasyState, UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Image } from 'shared/ui';

import styles from './styles.module.scss';
import { appTypes } from '../../../../../app';
import { File, MediaContentType } from '../../../../model/types';

type Props = {
    clickedFile: UseEasyStateReturnType<{ blob: Blob; name: string; type: MediaContentType } | null>;
    images: File[];
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { clickedFile, images } = props;

    const swiperState = useEasyState<{ visible: boolean; initial: number }>({ visible: false, initial: 1 });

    const updItems = images?.map((i, index) => ({
        id: i.id,
        name: i.name,
        url: i.url || '',
        width: 'auto',
        height: '220px',
        onClick: () => swiperState.set({ visible: true, initial: index }),
    }));

    return (
        <>
            <Image.Swiper
                initialSlide={swiperState.value.initial}
                closeClick={() => swiperState.set({ visible: false, initial: 1 })}
                visible={swiperState.value.visible}
                items={updItems}
            />
            <div className={styles.wrapper}>
                <Image.List clickedFile={clickedFile} items={updItems} style={{ maxWidth: updItems && updItems?.length < 2 ? '250px' : '360px' }} />
            </div>
        </>
    );
}

export default ImagesMessage;
