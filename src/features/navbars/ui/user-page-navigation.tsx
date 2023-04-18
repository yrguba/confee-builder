import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRowAndDropdown, useMedea } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { UtilsTS } from 'shared/types';
import { Button, Navbar, NavbarTypes } from 'shared/ui';

type Item = NavbarTypes.ResponsiveItem<any, any>;

function UserPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { breakpoint } = useMedea();
    const sm = breakpoint === 'sm';

    const items: Item[] = [
        { id: 0, text: 'Сообщения ', path: 'messages', breakpoint: sm ? 200 : 520 },
        { id: 1, text: 'Избранное', path: 'favorites', breakpoint: sm ? 300 : 640 },
        { id: 2, text: 'Задачи', path: 'tasks', breakpoint: sm ? 400 : 735 },
        { id: 3, text: 'Информация', path: 'info/images', breakpoint: sm ? 560 : 830 },
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

    return <Navbar.Responsive dropDownProps={{ position: 'left-bottom' }} itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} item={item} />;
}

export default UserPageNavigation;
