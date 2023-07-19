import React from 'react';

import { useStyles } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, LoadingIndicator } from 'shared/ui';

import styles from './styles.module.scss';
import { UserCardView } from '../../../user';
import { Chat } from '../../model/types';

type Props = {
    chat: Chat | BaseTypes.Empty;
    onClick?: (arg: Chat) => void;
    direction?: 'column' | 'row';
} & BaseTypes.Statuses;

function ChatDossierView(props: Props) {
    const { chat, onClick, loading, direction = 'column', error } = props;

    const wrapperClasses = useStyles(styles, 'wrapper', {
        directionColumn: direction === 'column',
    });

    return (
        <Box loading={loading} style={{ cursor: onClick ? 'pointer' : 'default' }} className={wrapperClasses}>
            {chat && (
                <>
                    <Avatar circle={false} name={chat.name} img={chat.avatar} size={direction === 'column' ? 252 : 160} />
                    <div className={styles.caption}>
                        <div className={styles.title}>Групповой чат</div>
                        <div className={styles.name}>{chat.name}</div>
                    </div>
                    <div className={styles.adminList}>
                        <div className={styles.title}>Администраторы</div>
                        <div className={styles.list}>
                            {chat?.members.map((admin, index) => (
                                <UserCardView key={index} user={admin} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </Box>
    );
}

export default ChatDossierView;
