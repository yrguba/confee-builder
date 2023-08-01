import React, { ReactNode } from 'react';

import { reactionConverter } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Emoji, EmojiTypes, Icons } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    clickMenuItem: (action: string) => void;
} & BaseTypes.Statuses;

function MessageMenu(props: Props) {
    const { clickMenuItem } = props;

    const items = [
        { id: 0, title: 'Ответить на сообщение', icon: 'answer', onClick: () => clickMenuItem('message') },
        { id: 1, title: 'Переслать сообщение', icon: 'forward', onClick: () => clickMenuItem('') },
        { id: 2, title: 'Скопировать текст', icon: 'copy', onClick: () => clickMenuItem('') },
        { id: 3, title: 'Редактировать сообщение', icon: 'edit', onClick: () => clickMenuItem('message') },
        { id: 4, title: 'Удалить сообщение', icon: 'delete', onClick: () => clickMenuItem('[message]') },
        { id: 5, title: 'Упомянуть автора', icon: 'mention', onClick: () => clickMenuItem('') },
        { id: 6, title: 'Преобразовать в задачу', icon: 'convert', onClick: () => clickMenuItem('') },
    ];

    return (
        <Box className={styles.wrapper}>
            {items.map((i) => (
                <div className={styles.item} key={i.id} onClick={i.onClick}>
                    {i.title}
                </div>
            ))}
        </Box>
    );
}

export default MessageMenu;
