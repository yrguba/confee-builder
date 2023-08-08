import React, { forwardRef } from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Box, Dropdown } from 'shared/ui';

import MessageMenu from './menu';
import styles from './styles.module.scss';
import ImagesMessage from './variants/images';
import TextMessage from './variants/text';
import { MessageProxy, MessageMenuActions } from '../../model/types';

type Props = {
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
} & BaseTypes.Statuses;

const Message = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { message, messageMenuAction } = props;

    const { id, type } = message;

    return (
        <Box className={styles.wrapper}>
            {!message.isMy && <Avatar size={52} img={message.author?.avatar?.path} />}

            <Dropdown.Dynamic
                reverseX={message.isMy}
                ref={ref}
                trigger="right-click"
                content={<MessageMenu messageMenuAction={messageMenuAction} message={message} />}
            >
                <div className={styles.content}>
                    <div className={`${styles.bubble} ${message.isMy ? styles.bubble_my : ''}`}>
                        <div>
                            {type === 'text' && <TextMessage text={message.text} />}
                            {type === 'images' && <ImagesMessage images={message.files} />}
                        </div>
                        <Box.Animated visible={message.isMock}>sending...</Box.Animated>
                    </div>
                </div>
            </Dropdown.Dynamic>
        </Box>
    );
});

export default Message;
