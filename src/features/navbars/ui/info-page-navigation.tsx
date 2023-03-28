import React, { useState, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Button, NavbarTypes, Navbar, Counter } from 'shared/ui';

type Routing = keyof typeof routing_tree.main;
type Item = NavbarTypes.ResponsiveItem<Routing, any>;

function InfoPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [activeItem, setActiveItem] = useState(0);

    const items: Item[] = [
        { id: 0, text: 'Изображения', icon: 'company', path: 'company', breakpoint: 610 },
        { id: 1, text: 'Видео', icon: 'chats', path: 'chats', breakpoint: 730 },
        { id: 2, text: 'Файлы', icon: 'tasks', path: 'tasks', breakpoint: 750 },
    ];

    const [isPending, startTransition] = useTransition();

    const onClick = (item: Item) => {
        setActiveItem(item.id);
    };

    const item = (item: Item) => (
        <Button.Link
            active={pathname.includes(item.path)}
            disabled={isPending}
            loading={isPending && pathname.includes(item.path)}
            key={item.id}
            onClick={() => onClick(item)}
            suffixIcon={<Counter height={20}>{32}</Counter>}
            fontSize={16}
            fontWeight={600}
        >
            {item.text}
        </Button.Link>
    );

    return <Navbar.WithLine gap={30} activeItemId={activeItem} item={item} items={items} />;
}

export default InfoPageNavigation;
