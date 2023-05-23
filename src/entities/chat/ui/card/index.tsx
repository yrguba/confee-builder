import moment from 'moment';
import React from 'react';

import { ViewerService } from 'entities/viewer';
import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Counter, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../message/model/types';
import { ChatProxy } from '../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    onClick: (arg: ChatProxy) => void;
    subtitle?: string;
    showDate?: boolean;
    showChecked?: boolean;
    maxWidth?: number;
} & BaseTypes.Statuses;

function ChatCardView(props: Props) {
    const { chat, subtitle, showDate, showChecked, onClick, maxWidth = 180 } = props;
    if (!chat) return null;

    const { name, pending_messages, updated_at, avatar, message } = chat;

    const getDate = (updated_at: Date) => {
        if (moment(updated_at).startOf('day').unix() === moment().startOf('day').unix()) {
            return moment(updated_at).format('LT');
        }
        return moment(updated_at).format('llll').split(',')[0];
    };

    const viewer = ViewerService.getViewer();

    return (
        <div className={styles.wrapper} onClick={() => onClick(chat)}>
            <div className={styles.leftColumn}>
                <Avatar img={avatar} name={name} size={42} />
                <div className={styles.caption} style={{ maxWidth }}>
                    <div className={styles.chatName}>{name}</div>
                    <div className={styles.lastMsg}>{subtitle}</div>
                </div>
            </div>
            <div className={styles.rightColumn}>
                {showDate && <div className={styles.date}>{getDate(chat.updated_at)}</div>}
                {showChecked && (
                    <div className={styles.checked}>
                        {pending_messages ? (
                            <Counter height={18}>{pending_messages}</Counter>
                        ) : (
                            Number(message[0].user.id) === Number(viewer?.id) && (
                                <Icons variants={message[0].users_have_read.length ? 'doubleCheck' : 'check'} />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatCardView;
