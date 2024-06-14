import React from 'react';
import { useWindowSize } from 'react-use';

import { useEasyState, useRustServer } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Image } from 'shared/ui';

import styles from './styles.module.scss';
import { appStore } from '../../../../../app';
import { messageStore } from '../../../../index';
import { MessageProxy } from '../../../../model/types';
import Info from '../../info';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function ImagesMessage(props: Props) {
    const { message } = props;
    const photoAndVideoFromSwiper = appStore.use.photoAndVideoFromSwiper();
    const visibleInfo = useEasyState(false);
    const highlightedMessages = messageStore.use.highlightedMessages();
    const images = message.files.length ? message.files : message.forwarded_from_message?.files;

    const { height } = useWindowSize();

    const updItems =
        images?.map((i, index) => ({
            id: i.id,
            name: i.name,
            url: i.url || '',
            width: 'auto',
            height: '220px',
        })) || [];

    const imgClick = (index: number) => {
        !highlightedMessages.value.length &&
            photoAndVideoFromSwiper.set({
                message,
                type: 'img',
                startIndex: index,
                items: updItems as any,
            });
    };

    return (
        <div className={styles.wrapper} onMouseEnter={() => visibleInfo.set(true)} onMouseLeave={() => visibleInfo.set(false)}>
            {highlightedMessages.value.find((i) => i.id === message.id) && <div className={styles.mask} />}
            {updItems?.length > 1 ? (
                <Image.List
                    imgClick={imgClick}
                    visibleDropdown={false}
                    items={updItems}
                    style={{ maxWidth: updItems && updItems?.length < 2 ? '250px' : '360px' }}
                />
            ) : (
                <Image maxHeight={`${height / 2}px`} visibleDropdown={false} maxWidth="400px" onClick={() => imgClick(0)} url={updItems[0]?.url || ''} />
            )}

            <Box.Animated visible={visibleInfo.value} className={styles.info}>
                <Info
                    date={message.date}
                    is_edited={message.is_edited}
                    sendingError={message.sendingError}
                    sending={message.sending}
                    isMy={message.isMy}
                    checked={!!message.users_have_read?.length}
                />
            </Box.Animated>
        </div>
    );
}

export default ImagesMessage;
