import React from 'react';

import styles from './styles.module.scss';
import { VideoListProps } from '../../types';
import VideoPlayer from '../base';

function VideoList(props: VideoListProps) {
    const { items } = props;

    return (
        <div className={styles.wrapper}>
            {items?.map((i) => (
                <VideoPlayer key={i.id} {...i} />
            ))}
        </div>
    );
}

export default VideoList;
