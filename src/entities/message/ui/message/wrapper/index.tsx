import React, { ReactNode } from 'react';

import { useDate } from 'shared/hooks';
import { reactionConverter } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Emoji, EmojiTypes, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../model/types';

type Props = {
    children: ReactNode;
    message: MessageProxy;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function Wrapper(props: Props) {
    const { children, message, reactionClick } = props;

    const { id, user, created_at, reactions } = message;

    const date = useDate(created_at);

    return (
        <Box className={styles.wrapper}>
            {!message.isMy && (
                <div className={styles.avatar}>
                    <Avatar size={32} img={user?.avatar} name={user?.name} />
                </div>
            )}
            <div className={styles.mainColumn}>
                <div className={`${styles.body} ${message?.isMy && styles.body_my}`}>
                    {!message?.isMy && <div className={styles.name}>{user?.name}</div>}
                    <div className={styles.messageContent}>{children}</div>
                    <div className={styles.footer}>
                        <div className={styles.reactions}>
                            {Object.entries(reactions).map(([reaction, arr]) =>
                                arr.length ? (
                                    <Emoji.Counter
                                        key={reaction}
                                        emoji={reactionConverter(reaction, 'unicode')}
                                        items={arr}
                                        onClick={() => reactionClick(id, reaction)}
                                    />
                                ) : null
                            )}
                        </div>
                        {message.is_edited && <div className={styles.isEdited}>изменено</div>}
                    </div>
                </div>
                <div className={`${styles.date} ${message?.isMy && styles.date_my}`}>
                    {date}
                    {message.isMy && <Icons variants={message.isMock ? 'clock' : message.users_have_read.length ? 'doubleCheck' : 'check'} />}
                </div>
            </div>
        </Box>
    );
}

export default Wrapper;
