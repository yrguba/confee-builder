import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../model/types';

type Props = {
    chat: ChatProxy[];
    deleteChat: () => void;
} & BaseTypes.Statuses;

function ChatProfileModalView(props: Props) {
    const { chat, deleteChat } = props;
    console.log(chat);
    return (
        <Box.Animated visible className={styles.wrapper}>
            ChatProfileModalView
        </Box.Animated>
    );
}

export default ChatProfileModalView;
