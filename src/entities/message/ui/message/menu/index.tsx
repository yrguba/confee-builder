import React, { ReactNode } from 'react';

import { reactionConverter } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Emoji, EmojiTypes, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageMenuActions } from '../../../model/types';

type Props = {
    messageMenuAction: (action: MessageMenuActions) => void;
} & BaseTypes.Statuses;

function MessageMenu(props: Props) {
    const { messageMenuAction } = props;

    const items: { id: number; title: string; action: MessageMenuActions }[] = [
        { id: 0, title: 'Ответить на сообщение', action: 'answer' },
        { id: 1, title: 'Переслать сообщение', action: 'forward' },
        { id: 2, title: 'Скопировать текст', action: 'copy' },
        { id: 3, title: 'Редактировать сообщение', action: 'edit' },
        { id: 4, title: 'Удалить сообщение', action: 'delete' },
        { id: 5, title: 'Упомянуть автора', action: 'mention' },
        { id: 6, title: 'Преобразовать в задачу', action: 'convert' },
    ];

    return (
        <Box className={styles.wrapper}>
            {items.map((i) => (
                <div className={styles.item} key={i.id} onClick={() => messageMenuAction(i.action)}>
                    {i.title}
                </div>
            ))}
        </Box>
    );
}

export default MessageMenu;
