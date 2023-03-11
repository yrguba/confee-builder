import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Button, ResponsiveNavbar, ResponsiveNavbarTypes } from 'shared/ui';

type Routing = keyof typeof routing_tree.main.company;
type Item = ResponsiveNavbarTypes.Item<Routing, any>;

function CompanyPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items: Item[] = [
        { id: 0, text: 'Сообщения ', path: 'messages', breakpoint: 500 },
        { id: 1, text: 'Избранное', path: 'favorites', breakpoint: 615 },
        { id: 2, text: 'Задачи', path: 'tasks', breakpoint: 710 },
        { id: 3, text: 'Информация', path: 'info', breakpoint: 800 },
    ];

    const [isPending, startTransition] = useTransition();
    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Item>(items);

    const item = (item: Item) => (
        <Button
            active={pathname.includes(item.path)}
            disabled={isPending}
            loading={isPending && pathname.includes(item.path)}
            key={item.id}
            onClick={() => startTransition(() => navigate(item.path))}
        >
            {item.text}
        </Button>
    );

    return <ResponsiveNavbar itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} item={item} />;
}

export default CompanyPageNavigation;
