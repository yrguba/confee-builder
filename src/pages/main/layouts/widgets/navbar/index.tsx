import React, { useTransition } from 'react';

import { chatApi } from 'entities/chat';
import { useRouter, useStorage } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Counter, Icons, IconsTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Navbar() {
    const { pathname, navigate } = useRouter();
    const [isPending, startTransition] = useTransition();
    const storage = useStorage();
    const { data: totalPendingMessages } = chatApi.handleGetTotalPendingMessages();

    const activeChatTab = storage.get('active-chats-tab');

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, { path: string; counter: number | undefined }>[] = [
        { id: 0, title: 'Контакты', icon: 'contacts', payload: { path: '/contacts', counter: 0 } },
        { id: 1, title: 'Сообщения', icon: 'messages', payload: { path: `/chats/${activeChatTab || ''}`, counter: totalPendingMessages } },
        { id: 2, title: 'Задачи', icon: 'tasks', payload: { path: '/tasks', counter: 0 } },
        { id: 3, title: 'Профиль', icon: 'profile', payload: { path: '/profile', counter: 0 } },
    ];

    const itemClick = (path: string) => {
        startTransition(() => navigate(path));
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.list}>
                    {items.map((i) => (
                        <div
                            key={i.id}
                            className={`${styles.item} ${i.payload.path.includes(`/${pathname?.split('/')[1]}`) ? styles.item_active : ''}`}
                            onClick={() => itemClick(i.payload.path)}
                        >
                            <div className={styles.counter}>
                                <Counter maxVisibleNumber={999} variant="negative">
                                    {i.payload.counter}
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
        </>
    );
}

export default Navbar;
//
