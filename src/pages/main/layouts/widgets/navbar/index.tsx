import React, { useTransition } from 'react';

import { useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Counter, Icons, IconsTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { chatApi } from '../../../../../entities/chat';

function Navbar() {
    const { pathname, navigate } = useRouter();

    const { data: totalPendingMessages } = chatApi.handleGetTotalPendingMessages();

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Контакты', icon: 'contacts', payload: '/contacts' },
        { id: 1, title: 'Сообщения', icon: 'messages', payload: '/chats' },
        { id: 2, title: 'Задачи', icon: 'tasks', payload: '/tasks' },
        { id: 3, title: 'Профиль', icon: 'profile', payload: '/settings' },
    ];

    const [isPending, startTransition] = useTransition();

    const itemClick = (path: string) => {
        startTransition(() => navigate(path));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                {items.map((i) => (
                    <div key={i.id} className={`${styles.item} ${pathname === i.payload ? styles.item_active : ''}`} onClick={() => itemClick(i.payload)}>
                        <div className={styles.counter}>
                            <Counter maxVisibleNumber={999} variant="negative">
                                {totalPendingMessages}
                            </Counter>
                        </div>
                        <Icons variant={i.icon} />
                        <Title textAlign="center" primary={false} variant="caption1M">
                            {i.title}
                        </Title>
                    </div>
                ))}
            </div>
            <div className={styles.viewer} />
        </div>
    );
}

export default Navbar;
