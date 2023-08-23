import React from 'react';

import styles from './styles.module.scss';
import { AudioListProps } from '../../types';
import VideoPlayer from '../base';

function VideoList(props: AudioListProps) {
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
