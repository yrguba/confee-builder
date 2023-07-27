import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ViewerCard } from 'features/viewer';
import { Button, Icons, Navbar, NavbarTypes } from 'shared/ui';

import { Icons as MenuIcons } from './icons';
import styles from './styles.module.scss';
import { useRowAndDropdown } from '../../../../../shared/hooks';

type Item = NavbarTypes.ResponsiveItem<any, any>;

function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items: Item[] = [
        { id: 0, text: 'Компания', icon: 'company', path: 'companies', breakpoint: 500 },
        { id: 1, text: 'Чаты и каналы', icon: 'chats', path: 'chats', breakpoint: 680 },
        { id: 2, text: 'Задачи', icon: 'tasks', path: 'tasks', breakpoint: 730 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Item>(items);

    const [isPending, startTransition] = useTransition();

    const item = (item: Item) => (
        <Button.Link
            active={pathname.includes(item.path)}
            disabled={isPending}
            loading={isPending && pathname.includes(item.path)}
            key={item.id}
            onClick={() => startTransition(() => navigate(pathname.split('/').pop() === 'settings' ? `/${item.path}` : item.path))}
            prefixIcon={<MenuIcons variants={item.icon} />}
            fontSize={16}
            fontWeight={600}
        >
            {item.text}
        </Button.Link>
    );

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Icons.Logo variants="confee" />
            </div>
            <div className={styles.nav}>
                <Navbar.Responsive btnRadius={30} itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} item={item} columnGap={30} />
            </div>
            <div className={styles.viewer}>
                <ViewerCard />
            </div>
        </div>
    );
}

export default Header;
