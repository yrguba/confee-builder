import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, IconsTypes, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageMenuActions, MessageProxy } from '../../../model/types';

type Props = {
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
} & BaseTypes.Statuses;

function MessageMenu(props: Props) {
    const { messageMenuAction, message } = props;

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, MessageMenuActions>[] = [
        { id: 0, title: 'Ответить', icon: 'add', payload: 'answer' },
        { id: 1, title: 'Переслать', icon: 'add', payload: 'forward' },
        { id: 2, title: 'Скопировать текст', icon: 'add', payload: 'copy' },
        { id: 3, title: 'Редактировать', icon: 'add', payload: 'edit' },
        { id: 4, title: 'Удалить', icon: 'delete', payload: 'delete' },
        { id: 5, title: 'Упомянуть автора', icon: 'add', payload: 'mention' },
        { id: 6, title: 'Преобразовать в задачу', icon: 'add', payload: 'convert' },
    ];

    return (
        <Box className={styles.wrapper}>
            {items.map((i) => (
                <div className={styles.item} key={i.id} onClick={() => messageMenuAction(i.payload, message)}>
                    <Icons variants={i.icon} />
                    <Title variant="H3M">{i.title}</Title>
                </div>
            ))}
        </Box>
    );
}

export default MessageMenu;
