import React, { ReactNode } from 'react';
import ReactPlayer from 'react-player/youtube';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    url: string;
} & BaseTypes.Statuses;

function YouTubePlayer(props: Props) {
    const { url, children } = props;

    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.link}>{children}</div>
            <div className={styles.player}>
                <ReactPlayer width="100%" controls url={url} />
            </div>
        </div>
    );
}

export default YouTubePlayer;
