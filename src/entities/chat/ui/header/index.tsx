import React from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Icons, Card, Box, Button } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    clickChatCard: () => void;
    clickChatAudioCall: () => void;
    back: () => void;
} & BaseTypes.Statuses;

function ChatHeaderView(props: Props) {
    const { chat, clickChatCard, clickChatAudioCall, back } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Box.Animated visible={useWidthMediaQuery().to('sm')} onClick={back}>
                    <Icons variant="arrow-left" />
                </Box.Animated>
                <Card img={chat?.avatar} title={chat?.name} subtitle={chat?.subtitle} onClick={clickChatCard} />
            </div>
            <div className={styles.right}>
                <Button.Circle onClick={clickChatAudioCall}>
                    <Icons variant="phone" />
                </Button.Circle>
            </div>
        </div>
    );
}

export default ChatHeaderView;
