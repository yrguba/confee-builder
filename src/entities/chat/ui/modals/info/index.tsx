import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../model/types';

type Props = {
    chats: ChatProxy[];
    clickOnChat: (arg: ChatProxy) => void;
    activeChatId: number | null;
} & BaseTypes.Statuses;

function ChatInfoModalView(props: Props) {
    const { chats, clickOnChat, loading, activeChatId } = props;

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            ChatInfoModalView
        </Box.Animated>
    );
}

export default ChatInfoModalView;
