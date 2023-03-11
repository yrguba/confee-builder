import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { ResponsiveNavbar, ResponsiveNavbarTypes } from 'shared/ui';

import Icons from './icons';

type Routing = keyof typeof routing_tree.main;
type Item = ResponsiveNavbarTypes.Item<Routing, any>;

function MainPageNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const items: Item[] = [
        { id: 0, text: 'Компания', icon: 'company', path: 'company', breakpoint: 500 },
        { id: 1, text: 'Чаты и каналы', icon: 'chats', path: 'chats', breakpoint: 700 },
        { id: 2, text: 'Задачи', icon: 'tasks', path: 'tasks', breakpoint: 750 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Item>(items);
    const [isPending, startTransition] = useTransition();

    const clickOnTab = (item: Item) => {
        startTransition(() => navigate(item.path));
    };

    const item = (item: Item) => (
        <div key={item.id} onClick={() => clickOnTab(item)}>
            <Icons variants={item.icon} />
            {item.text}
        </div>
    );

    return <ResponsiveNavbar itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} item={item} />;
}

export default MainPageNavigation;
