import React, { ReactNode } from 'react';
import ReactPlayer from 'react-player/youtube';

import { appService } from 'entities/app';
import { useCallbackRef } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    url: string;
} & BaseTypes.Statuses;

function YouTubePlayer(props: Props) {
    const { url, children } = props;
    const urls = appService.getUrls();
    const playerRef = useCallbackRef<any>((current) => {});

    return (
        <div {...props} className={styles.wrapper}>
            <div className={styles.link}>{children}</div>
            <div className={styles.player}>
                {!appService.isDev && (
                    <ReactPlayer
                        ref={playerRef}
                        width="100%"
                        url={url}
                        config={{
                            playerVars: {
                                origin: urls.clientBaseURL,
                                host: 'https://www.youtube.com',
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default YouTubePlayer;
