import React, { useRef } from 'react';

import { storage } from 'entities/app';
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
    messageMenuAction: (action: MessageMenuActions) => void;
} & BaseTypes.Statuses;

function Message(props: Props) {
    const { message, lastFive, messageMenuAction } = props;

    const { id, type } = message;

    const sm = useWidthMediaQuery().to('sm');

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

    return (
        <Box className={styles.wrapper}>
            {!message.isMy && <Avatar size={52} withUrl img={message.author?.avatar?.path} />}
            <Dropdown
                openCloseTrigger={openCloseTrigger}
                stopPropagation={false}
                dynamicPosition
                left={sm ? (message.isMy ? (messageRef?.current?.clientWidth || 0) - 50 : 50) : 0}
                reverseX={message.isMy}
                reverseY={lastFive}
                trigger="right-click"
                content={<MessageMenu messageMenuAction={messageMenuAction} />}
            >
                <div className={styles.content} ref={messageRef}>
                    <div className={`${styles.bubble} ${message.isMy ? styles.bubble_my : ''}`}>{type === 'text' && <TextMessage text={message.text} />}</div>
                </div>
            </Dropdown>
        </Box>
    );
}

export default Message;
