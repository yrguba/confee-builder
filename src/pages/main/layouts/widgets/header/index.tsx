import React, { useTransition } from 'react';

import { useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, IconsTypes } from 'shared/ui';

import styles from './styles.module.scss';

function Header() {
    const { pathname, navigate } = useRouter();

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Компания', icon: 'contacts', payload: '/companies' },
        { id: 1, title: 'Чаты и каналы', icon: 'messages', payload: '/chats' },
        { id: 2, title: 'Задачи', icon: 'tasks', payload: '/tasks' },
        { id: 3, title: 'Профиль', icon: 'profile', payload: '/settings' },
    ];

    const [isPending, startTransition] = useTransition();

    const itemClick = (path: string) => {
        startTransition(() => navigate(path));
    };

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons.Logo variant="confee" />
            </div>
            <div className={styles.nav}>
                {items.map((i) => (
                    <Button.Link key={i.id} onClick={() => itemClick(i.payload)} active={pathname === i.payload} prefixIcon={<Icons variant={i.icon} />}>
                        {i.title}
                    </Button.Link>
                ))}
            </div>
            <div className={styles.viewer} />
        </div>
    );
}

export default Header;
