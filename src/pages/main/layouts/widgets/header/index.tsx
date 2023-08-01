import React, { useTransition } from 'react';

import { useRouter } from 'shared/hooks';
import { Button, Icons } from 'shared/ui';

import styles from './styles.module.scss';

function Header() {
    const { pathname, navigate } = useRouter();

    const items = [
        { id: 0, text: 'Компания', icon: 'contacts', path: '/companies' },
        { id: 1, text: 'Чаты и каналы', icon: 'messages', path: '/chats' },
        { id: 2, text: 'Задачи', icon: 'tasks', path: '/tasks' },
        { id: 3, text: 'Профиль', icon: 'profile', path: '/settings' },
    ];

    const [isPending, startTransition] = useTransition();

    const itemClick = (path: string) => {
        startTransition(() => navigate(path));
    };

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons.Logo variants="confee" />
            </div>
            <div className={styles.nav}>
                {items.map((i: any) => (
                    <Button.Link key={i.id} onClick={() => itemClick(i.path)} active={pathname === i.path} prefixIcon={<Icons variants={i.icon} />}>
                        {i.text}
                    </Button.Link>
                ))}
            </div>
            <div className={styles.viewer} />
        </div>
    );
}

export default Header;
