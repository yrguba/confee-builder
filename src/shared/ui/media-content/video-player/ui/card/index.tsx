import React from 'react';

import styles from './styles.module.scss';
import { sizeConverter } from '../../../../../lib';
import Title from '../../../../title';
import { VideoCardProps } from '../../types';
import VideoPlayer from '../base';

function VideoCard(props: VideoCardProps) {
    const { url, size, name } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <VideoPlayer url={url} width="37px" height="37px" />
            </div>
            <div className={styles.caption}>
                <Title variant="H3M">{name}</Title>
                <Title variant="H4M">{sizeConverter(size)}</Title>
            </div>
        </div>
    );
}
export default VideoCard;
