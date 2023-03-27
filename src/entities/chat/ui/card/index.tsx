import React from 'react';

import { useDate } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Avatar } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { Chat, ChatCardIcons } from '../../model/types';

type Props = {
    chat: Chat;
} & baseTypes.Statuses;

function ChatCardView(props: Props) {
    const { chat } = props;

    const date = useDate(chat.updated_at);

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftColumn}>
                <Avatar img={chat.avatar} name={chat.name} size={50} />
            </div>

            <div className={styles.centerColumn}>
                <div className={styles.chatName}>{chat.name}</div>
                <div className={styles.lastMsg}>last msg</div>
            </div>
            <div className={styles.rightColumn}>
                <div className={styles.date}>{date}</div>
                <div className={styles.checked}>
                    <Icons variants="check" />
                </div>
            </div>
        </div>
    );
}

export default ChatCardView;
