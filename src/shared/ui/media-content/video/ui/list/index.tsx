import React from 'react';

import styles from './styles.module.scss';
import { VideoListProps } from '../../types';
import VideoPlayer from '../base';

function VideoList(props: VideoListProps) {
    const { videoClick, visibleDropdown = true, items, style } = props;

    return (
        <div className={styles.wrapper} style={style}>
            {items?.map((i, index) => (
                <VideoPlayer visibleDropdown={visibleDropdown} key={i.id} {...i} onClick={() => videoClick && videoClick(index)} />
            ))}
        </div>
    );
}

export default VideoList;
