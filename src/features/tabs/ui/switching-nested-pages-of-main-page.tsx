import React, { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { SwitchingNestedPagesOfMainPageView, tabsTypes } from 'entities/tabs';
import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';

type Routing = keyof typeof routing_tree.main;
type Tab = tabsTypes.Tab<Routing>;

function SwitchingNestedPagesOfMainPage() {
    const navigate = useNavigate();

    const [isPending, startTransition] = useTransition();

    const tabs: Tab[] = [
        { id: 0, text: 'Компания', icon: 'company', path: 'company', breakpoint: 500 },
        { id: 1, text: 'Чаты и каналы', icon: 'chats', path: 'chats', breakpoint: 700 },
        { id: 2, text: 'Задачи', icon: 'tasks', path: 'tasks', breakpoint: 750 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Tab>(tabs);

    const clickOnTab = (tab: Tab) => {
        startTransition(() => navigate(tab.path));
    };

    return <SwitchingNestedPagesOfMainPageView itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} clickOnTab={clickOnTab} loading={isPending} />;
}

export default SwitchingNestedPagesOfMainPage;
