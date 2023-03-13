import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Button, Navbar, NavbarTypes } from 'shared/ui';

type Routing = keyof typeof routing_tree.main.company;
type Item = NavbarTypes.ResponsiveItem<Routing, any>;

function CompanyPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items: Item[] = [
        { id: 0, text: 'Сообщения ', path: 'messages', breakpoint: 520 },
        { id: 1, text: 'Избранное', path: 'favorites', breakpoint: 640 },
        { id: 2, text: 'Задачи', path: 'tasks', breakpoint: 735 },
        { id: 3, text: 'Информация esf', path: 'info', breakpoint: 830 },
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

    return <Navbar.Responsive itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} item={item} />;
}

export default CompanyPageNavigation;
