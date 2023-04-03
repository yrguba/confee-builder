import React, { ReactNode } from 'react';

import { useDate } from 'shared/hooks';
import { reactionConverter } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Avatar, Reactions } from 'shared/ui';

import styles from './styles.module.scss';
import { Message } from '../../../model/types';

type Props = {
    children: ReactNode;
    message: Message;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function Wrapper(props: Props) {
    const { children, message, reactionClick } = props;

    const { id, user, created_at, reactions } = message;

    const date = useDate(created_at);

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar size={32} img={user.avatar} name={user.name} />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.content}>
                    <div className={styles.name}>{user.name}</div>
                    <div className={styles.message}>{children}</div>
                    <div className={styles.reactions}>
                        {Object.entries(reactions).map(([reaction, arr]) =>
                            arr.length ? (
                                <Reactions.Counter
                                    key={reaction}
                                    emoji={reactionConverter(reaction, 'unicode')}
                                    items={arr}
                                    onClick={() => reactionClick(id, reaction)}
                                />
                            ) : null
                        )}
                    </div>
                </div>
                <div className={styles.date}>{date}</div>
            </div>
        </div>
    );
}

export default Wrapper;
