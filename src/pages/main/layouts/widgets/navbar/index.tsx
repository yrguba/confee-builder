import React, { useTransition } from 'react';

import { chatApi } from 'entities/chat';
import { useRouter, useRustServer, useStorage } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Counter, Icons, IconsTypes, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { appService } from '../../../../../entities/app';
import { tokensService, viewerApi } from '../../../../../entities/viewer';

function Navbar() {
    const { pathname, navigate } = useRouter();
    const [isPending, startTransition] = useTransition();
    const storage = useStorage();
    const { data: totalPendingMessages } = chatApi.handleGetTotalPendingMessages();
    const { mutate: handleLogout } = viewerApi.handleLogout();
    const activeChatTab = storage.get('active_chats_tab');

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, { path: string; counter: number | undefined }>[] = [
        { id: 0, title: 'Контакты', icon: 'contacts', payload: { path: '/contacts', counter: 0 } },
        { id: 1, title: 'Сообщения', icon: 'messages', payload: { path: `/chats/${activeChatTab || ''}`, counter: totalPendingMessages } },
        // { id: 2, title: 'Задачи', icon: 'tasks', payload: { path: '/tasks', counter: 0 } },
        { id: 3, title: 'Профиль', icon: 'profile', payload: { path: '/profile', counter: 0 } },
        { id: 4, title: 'Выйти', icon: 'logout', payload: { path: '', counter: 0 }, hidden: appService.tauriIsRunning },
    ];

    const confirmLogout = Modal.useConfirm((value) => {
        if (value) {
            handleLogout(null, {
                onSuccess: () => {
                    tokensService.remove();
                    storage.remove('session');
                    window.location.reload();
                },
            });
        }
    });

    const itemClick = (path: string) => {
        if (path) {
            startTransition(() => navigate(path));
        } else {
            confirmLogout.open();
        }
    };

    const { invoker } = useRustServer();

    return (
        <>
            <Modal.Confirm {...confirmLogout} title="Выйти из аккаунта" closeText="Отмена" okText="Выйти" />
            <div className={styles.wrapper}>
                <div className={styles.list}>
                    {items
                        .filter((i) => !i.hidden)
                        .map((i) => (
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
                    {/* <Button onClick={() => invoker.setIconCounter('33')}>icon</Button> */}
                </div>
                <div className={styles.viewer} />
            </div>
        </>
    );
}

export default Navbar;
//
