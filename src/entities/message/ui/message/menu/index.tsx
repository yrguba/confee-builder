import moment from 'moment';
import React, { useEffect } from 'react';

import { useArray } from 'shared/hooks';
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
        { id: 0, title: 'Ответить', icon: 'reply', payload: 'reply' },
        { id: 1, title: 'Изменить', icon: 'edit', payload: 'edit' },
        { id: 2, title: 'Закрепить', icon: 'pin', payload: 'fixed' },
        { id: 3, title: 'Копировать текст', icon: 'copy', payload: 'copy' },
        { id: 4, title: 'Переслать', icon: 'redirect', payload: 'forward' },
        { id: 5, title: 'Удалить', icon: 'delete', payload: 'delete' },
        { id: 6, title: 'Выделить', icon: 'check-circle', payload: 'highlight' },
    ];

    const { array, deleteByIds, deleteById } = useArray({
        initialArr: items,
    });

    useEffect(() => {
        if (!message.isMy) deleteByIds([1, 5]);
        if (!message.isMy || moment().unix() - moment(message.created_at).unix() > 86400 || message.type !== 'text') deleteById(1);
    }, []);

    return (
        <Box className={styles.wrapper}>
            <div className={styles.items}>
                {array.map((i) => (
                    <div className={styles.item} key={i.id} onClick={() => messageMenuAction(i.payload, message)}>
                        <Icons variant={i.icon} />
                        <Title variant="H3M">{i.title}</Title>
                    </div>
                ))}
            </div>
        </Box>
    );
}

export default MessageMenu;
