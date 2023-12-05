import React from 'react';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../../hooks';
import { VideoListProps } from '../../types';
import VideoPlayer from '../base';
import Swiper from '../swiper';

function VideoList(props: VideoListProps) {
    const { clickedFile, items, style } = props;

    const visibleSwiper = useEasyState({ visible: false, init: 0 });

    return (
        <>
            <Swiper
                items={items}
                visible={visibleSwiper.value.visible}
                initialSlide={visibleSwiper.value.init}
                closeClick={() => visibleSwiper.set({ visible: false, init: 0 })}
            />
            <div className={styles.wrapper} style={style}>
                {items?.map((i, index) => (
                    <VideoPlayer clickedFile={clickedFile} key={i.id} {...i} onClick={() => visibleSwiper.set({ visible: true, init: index })} />
                ))}
            </div>
        </>
    );
}

export default VideoList;
