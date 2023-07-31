import React, { ReactNode } from 'react';

import { reactionConverter } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Emoji, EmojiTypes, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { useStyles } from '../../../../shared/hooks';
import { MessageProxy } from '../../model/types';

type Props = {
    message: MessageProxy;
} & BaseTypes.Statuses;

function Message(props: Props) {
    const { message } = props;

    const { id, author, created_at, reactions } = message;

    const classes = useStyles(styles, 'wrapper', {
        myMessage: message.isMy,
    });

    return <Box className={styles.wrapper}>fwaf</Box>;
}

export default Message;
