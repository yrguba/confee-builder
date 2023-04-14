import React from 'react';

import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Counter } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { ChatProxy } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    onClick: (arg: ChatProxy) => void;
    subtitle?: string;
    showDate?: boolean;
    showChecked?: boolean;
} & BaseTypes.Statuses;

function ChatCardView(props: Props) {
    const { chat, subtitle, showDate, showChecked, onClick } = props;
    if (!chat) return null;

    const { name, pending_messages, updated_at, avatar, message } = chat;

    const date = useDate(updated_at);

    return (
        <div className={styles.wrapper} onClick={() => onClick(chat)}>
            <div className={styles.leftColumn}>
                <Avatar img={avatar} name={name} size={42} />
            </div>

            <div className={styles.centerColumn}>
                <div className={styles.chatName}>{name}</div>
                <div className={styles.lastMsg}>{subtitle}</div>
            </div>
            <div className={styles.rightColumn}>
                {showDate && <div className={styles.date}>{date}</div>}
                {showChecked && (
                    <div className={styles.checked}>
                        {pending_messages ? (
                            <Counter height={18}>{pending_messages}</Counter>
                        ) : (
                            <Icons variants={message[0].users_have_read.length ? 'doubleCheck' : 'check'} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatCardView;
