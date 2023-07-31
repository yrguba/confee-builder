import React, { ReactNode } from 'react';

import { reactionConverter } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Emoji, EmojiTypes, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import TextMessage from './variants/text';
import { useStyles } from '../../../../shared/hooks';
import { MessageProxy } from '../../model/types';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function Message(props: Props) {
    const { message } = props;

    const { id, type } = message;

    return (
        <Box className={styles.wrapper}>
            {!message.isMy && <Avatar size={52} withUrl img={message.author?.avatar?.path} />}
            <div className={styles.content}>
                <div className={`${styles.bubble} ${message.isMy ? styles.bubble_my : ''}`}>{type === 'text' && <TextMessage text={message.text} />}</div>
            </div>
        </Box>
    );
}

export default Message;
