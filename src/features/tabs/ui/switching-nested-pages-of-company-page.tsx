import React, { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { SwitchingNestedPagesOfCompanyPageView, tabsTypes } from 'entities/tabs';
import { useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';

type Routing = keyof typeof routing_tree.main.company;
type Tab = tabsTypes.Tab<Routing>;

function SwitchingNestedPagesOfCompanyPage() {
    const navigate = useNavigate();

    const [isPending, startTransition] = useTransition();

    const tabs: Tab[] = [
        { id: 0, text: 'Сообщения ', path: 'messages', breakpoint: 500 },
        { id: 1, text: 'Избранное', path: 'favorites', breakpoint: 615 },
        { id: 2, text: 'Задачи', path: 'tasks', breakpoint: 710 },
        { id: 3, text: 'Информация', path: 'info', breakpoint: 800 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Tab>(tabs);

    const clickOnTab = (tab: Tab) => {
        startTransition(() => navigate(tab.path));
    };

    return <SwitchingNestedPagesOfCompanyPageView itemsInDropdown={itemsInDropdown} itemsInRow={itemsInRow} clickOnTab={clickOnTab} loading={isPending} />;
}

export default SwitchingNestedPagesOfCompanyPage;
