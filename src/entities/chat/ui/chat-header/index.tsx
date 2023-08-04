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
            <div>
                {useWidthMediaQuery().to('sm') && (
                    <div onClick={back}>
                        <Icons variant="arrow-left" />
                    </div>
                )}
                <Box.Animated visible>
                    <Card img={chat?.avatar} title={chat?.name} subtitle={chat?.subtitle} onClick={clickChatCard} />
                </Box.Animated>
            </div>
            <div>
                <Button.Circle onClick={clickChatAudioCall}>
                    <Icons variant="phone" />
                </Button.Circle>
            </div>
        </div>
    );
}

export default ChatHeaderView;
