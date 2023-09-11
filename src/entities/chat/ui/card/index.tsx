import React, { forwardRef } from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../model/types';

type Props = {
    clickOnChat: (arg: ChatProxy) => void;
    chat: ChatProxy;
    active: boolean;
} & BaseTypes.Statuses;

const ChatCardView = forwardRef((props: Props, ref: any) => {
    const { clickOnChat, chat, active } = props;

    return (
        <div ref={ref} key={chat?.id} className={`${styles.wrapper} ${active ? styles.wrapper_active : ''}`} onClick={() => clickOnChat(chat)}>
            <div className={styles.body}>
                <div className={styles.avatar}>
                    <Avatar networkStatus={chat?.secondMember?.networkStatus} size={52} img={chat.avatar} name={chat?.name} />
                </div>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.left}>
                            <Title variant="H3S">{chat?.name}</Title>
                            {!chat.is_personal && <Button tag>TFN</Button>}
                        </div>
                        <div className={styles.right}>
                            <Title textAlign="right" variant="caption1M" primary={false}>
                                {chat?.date}
                            </Title>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.left}>
                            <Title primary={false} variant="H3R">
                                {chat?.lastMessageTitle}
                            </Title>
                        </div>
                        <div className={styles.right}>
                            {chat.pending_messages_count ? (
                                <Counter variant="primary" height={18}>
                                    {chat?.pending_messages_count}
                                </Counter>
                            ) : (
                                chat?.checkIsMyLastMessage && <Icons variant={chat?.last_message.users_have_read.length ? 'double-check' : 'check'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
export default ChatCardView;
