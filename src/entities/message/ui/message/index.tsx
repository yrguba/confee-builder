import React, { forwardRef, useRef } from 'react';

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
} & BaseTypes.Statuses;

const Message = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { message, lastFive, messageMenuAction } = props;

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
            // messageRef.current.scrollIntoView({ behavior: 'smooth', block: getBlock(), inline: 'nearest' });
        }
    };

    return (
        <Box className={styles.wrapper}>
            {!message.isMy && <Avatar size={52} img={message.author?.avatar?.path} />}

            <Dropdown.Dynamic
                reverseX={message.isMy}
                ref={ref}
                openCloseTrigger={openCloseTrigger}
                trigger="right-click"
                content={<MessageMenu messageMenuAction={messageMenuAction} message={message} />}
            >
                <div className={styles.content} ref={messageRef}>
                    <div className={`${styles.bubble} ${message.isMy ? styles.bubble_my : ''}`}>{type === 'text' && <TextMessage text={message.text} />}</div>
                </div>
            </Dropdown.Dynamic>
        </Box>
    );
});

export default Message;
