import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Button, ResponsiveNavbar, ResponsiveNavbarTypes } from 'shared/ui';

import Icons from './icons';

type Routing = keyof typeof routing_tree.main;
type Item = ResponsiveNavbarTypes.Item<Routing, any>;

function MainPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items: Item[] = [
        { id: 0, text: 'Компания', icon: 'company', path: 'company', breakpoint: 610 },
        { id: 1, text: 'Чаты и каналы', icon: 'chats', path: 'chats', breakpoint: 730 },
        { id: 2, text: 'Задачи', icon: 'tasks', path: 'tasks', breakpoint: 750 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Item>(items);
    const [isPending, startTransition] = useTransition();

    const item = (item: Item) => (
        <Button.Link
            active={pathname.includes(item.path)}
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

    return <ResponsiveNavbar itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} item={item} rowGap={30} />;
}

export default MainPageNavigation;
