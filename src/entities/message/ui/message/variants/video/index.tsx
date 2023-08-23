import React from 'react';

import { BaseTypes } from 'shared/types';
import { VideoPlayer } from 'shared/ui';

import styles from './styles.module.scss';
import { File } from '../../../../model/types';

type Props = {
    videos: File[];
} & BaseTypes.Statuses;

function VideoMessage(props: Props) {
    const { videos } = props;

    return (
        <div className={styles.wrapper}>
            <VideoPlayer.List
                items={videos.map((i) => ({
                    id: i.id,
                    url: i.link,
                    width: 'auto',
                    horizontalImgWidth: '99%',
                    height: '200px',
                }))}
            />
        </div>
    );
}

export default VideoMessage;
