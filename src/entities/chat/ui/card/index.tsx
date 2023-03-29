import React from 'react';
import { useParams } from 'react-router';

import { useDate, useStyles } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { Chat } from '../../model/types';

type Props = {
    chat: Chat | BaseTypes.Empty;
    onClick: (arg: Chat) => void;
    subtitle: string;
    showDate?: boolean;
    showChecked?: boolean;
} & BaseTypes.Statuses;

function ChatCardView(props: Props) {
    const { chat, subtitle, showDate, showChecked, onClick } = props;
    if (!chat) return null;

    const date = useDate(chat.updated_at);

    return (
        <div className={styles.wrapper} onClick={() => onClick(chat)}>
            <div className={styles.leftColumn}>
                <Avatar img={chat.avatar} name={chat.name} size={42} />
            </div>

            <div className={styles.centerColumn}>
                <div className={styles.chatName}>{chat.name}</div>
                <div className={styles.lastMsg}>{subtitle}</div>
            </div>
            <div className={styles.rightColumn}>
                {showDate && <div className={styles.date}>{date}</div>}
                {showChecked && (
                    <div className={styles.checked}>
                        <Icons variants="check" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatCardView;
