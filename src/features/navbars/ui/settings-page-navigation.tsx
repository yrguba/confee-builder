import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { Button, Navbar, NavbarTypes } from 'shared/ui';

import Icons from './icons';

type Routing = '/' | keyof typeof routing_tree.settings;
type Item = NavbarTypes.BaseItem<Routing, any>;

function SettingsPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items: Item[] = [
        { id: 0, text: 'Профиль', icon: 'company', path: 'profile' },
        { id: 1, text: 'Настройки приватности', icon: 'chats', path: 'privacy' },
        { id: 2, text: 'Выход из учетной записи', icon: 'tasks', path: '/' },
    ];

    const [isPending, startTransition] = useTransition();

    const item = (item: Item) => (
        <Button.Link
            active={pathname.includes(item.path) && item.path !== '/'}
            disabled={isPending}
            loading={isPending && pathname.includes(item.path)}
            key={item.id}
            onClick={() => startTransition(() => navigate(item.path))}
            prefixIcon={<Icons variants={item.icon} />}
            fontSize={16}
            fontWeight={600}
        >
            {item.text}
        </Button.Link>
    );

    return <Navbar items={items} item={item} direction="column" gap={24} />;
}

export default SettingsPageNavigation;
