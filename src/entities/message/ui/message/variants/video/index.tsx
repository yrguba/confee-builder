import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Video } from 'shared/ui';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../../../shared/hooks';
import { appStore } from '../../../../../app';
import { messageStore } from '../../../../index';
import { MessageProxy } from '../../../../model/types';
import Info from '../../info';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function VideoMessage(props: Props) {
    const { message } = props;
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const highlightedMessages = messageStore.use.highlightedMessages();
    const visibleInfo = useEasyState(false);

    const videos = message.files.length ? message.files : message.forwarded_from_message?.files;

    const updItems = videos?.map((i, index) => ({
        id: i.id,
        name: i.name,
        url: i.url || '',
        height: 'auto',
    }));

    const videoClick = (index: number) => {
        !highlightedMessages.value.length &&
            photoAndVideoFromSwiper.set({
                message,
                type: 'video',
                startIndex: index,
                items: updItems as any,
            });
    };

    return (
        <div className={styles.wrapper} onMouseEnter={() => visibleInfo.set(true)} onMouseLeave={() => visibleInfo.set(false)}>
            {highlightedMessages.value.find((i) => i.id === message.id) && <div className={styles.mask} />}
            <Video.List
                videoClick={videoClick}
                visibleDropdown={false}
                items={updItems}
                style={{ maxWidth: updItems && updItems?.length < 2 ? '250px' : '360px' }}
            />
            <div className={styles.info}>
                <Info
                    bg
                    date={message.date}
                    is_edited={message.is_edited}
                    sendingError={message.sendingError}
                    sending={message.sending}
                    isMy={message.isMy}
                    checked={!!message.users_have_read?.length}
                />
            </div>
        </div>
    );
}

export default VideoMessage;
