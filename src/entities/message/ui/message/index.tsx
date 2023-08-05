import React, { useRef } from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Dropdown } from 'shared/ui';

import MessageMenu from './menu';
import styles from './styles.module.scss';
import TextMessage from './variants/text';
import { MessageProxy, MessageMenuActions } from '../../model/types';

type Props = {
    message: MessageProxy;
    lastFive: boolean;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
    wrapperSize: { width: number; height: number } | undefined;
} & BaseTypes.Statuses;

function Message(props: Props) {
    const { message, lastFive, messageMenuAction, wrapperSize } = props;

    const { id, type } = message;

    const sm = useWidthMediaQuery().to('sm');
    const md = useWidthMediaQuery().to('md');
    const messageRef = useRef<HTMLDivElement>(null);

    const getBlock = () => {
        if (sm) return lastFive ? 'end' : 'start';
        return 'center';
    };

    const openCloseTrigger = (value: boolean) => {
        if (messageRef.current && value) {
            messageRef.current.scrollIntoView({ behavior: 'smooth', block: getBlock(), inline: 'nearest' });
        }
    };

    const getLeftPositionMenu = () => {
        // if (messageRef.current && wrapperSize) {
        //     console.log('wrapper width', wrapperSize.width);
        //     const mirror = (width: number) => wrapperSize.width - width;
        //     const messageWidth = messageRef.current.clientWidth;
        //     const freeDistance = wrapperSize?.width - messageWidth;
        //     console.log(`freeDistance ${message.text}`, freeDistance);
        //     console.log(`message width ${message.text}`, messageWidth);
        //     if (freeDistance < 200) return messageWidth;
        //     if (freeDistance < 300) return messageWidth - 20;
        //     if (md || sm) return 0;
        // }

        return 0;
    };

    return (
        <Box className={styles.wrapper}>
            {!message.isMy && <Avatar size={52} img={message.author?.avatar?.path} />}

            <Dropdown
                contentWidth={280}
                wrapperSize={wrapperSize}
                openCloseTrigger={openCloseTrigger}
                stopPropagation={false}
                dynamicPosition
                left={getLeftPositionMenu()}
                reverseX={message.isMy}
                reverseY={lastFive}
                trigger="right-click"
                content={<MessageMenu messageMenuAction={messageMenuAction} message={message} />}
            >
                <div className={styles.content} ref={messageRef}>
                    <div className={`${styles.bubble} ${message.isMy ? styles.bubble_my : ''}`}>{type === 'text' && <TextMessage text={message.text} />}</div>
                </div>
            </Dropdown>
        </Box>
    );
}

export default Message;
