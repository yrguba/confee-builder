import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Video } from 'shared/ui';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../../../shared/hooks';
import { MessageProxy } from '../../../../model/types';
import Info from '../../info';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function VideoMessage(props: Props) {
    const { message } = props;

    const visibleInfo = useEasyState(false);

    const videos = message.files || message.forwarded_from_message?.files;

    const updItems = videos?.map((i, index) => ({
        id: i.id,
        name: i.name,
        url: i.url || '',
        height: 'auto',
    }));

    return (
        <div className={styles.wrapper} onMouseEnter={() => visibleInfo.set(true)} onMouseLeave={() => visibleInfo.set(false)}>
            <Video.List items={updItems} style={{ maxWidth: updItems && updItems?.length < 2 ? '250px' : '360px' }} />
            <Box.Animated visible={visibleInfo.value} className={styles.info}>
                <Info
                    date={message.date}
                    is_edited={message.is_edited}
                    sendingError={message.sendingError}
                    sending={message.sending}
                    isMy={message.isMy}
                    checked={!!message.users_have_read}
                />
            </Box.Animated>
        </div>
    );
}

export default VideoMessage;
