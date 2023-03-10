import React, { useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { routing_tree } from 'shared/routing';
import { Button, Dropdown, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { useRowAndDropdown } from '../../../../shared/hooks';
import { tabsTypes } from '../../index';

type Routing = keyof typeof routing_tree.main.company;
type Tab = tabsTypes.Tab<Routing>;

function SwitchingNestedPagesOfCompanyPage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const suffixPath = pathname.split('/').pop();

    const [isPending, startTransition] = useTransition();

    const tabs: Tab[] = [
        { id: 0, text: 'Сообщения ', path: 'messages', breakpoint: 500 },
        { id: 1, text: 'Избранное', path: 'favorites', breakpoint: 615 },
        { id: 2, text: 'Задачи', path: 'tasks', breakpoint: 710 },
        { id: 3, text: 'Информация', path: 'info', breakpoint: 800 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Tab>(tabs);

    const buttonClick = (id: number, path: any) => {
        startTransition(() => navigate(path));
    };

    const item = (tab: Tab) => (
        <Button
            active={suffixPath === tab.path}
            disabled={isPending}
            loading={isPending && suffixPath === tab.path}
            key={tab.id}
            onClick={() => buttonClick(tab.id, tab.path)}
        >
            {tab.text}
        </Button>
    );

    return (
        <div className={styles.tabs}>
            {itemsInRow.map((tab) => item(tab))}
            {itemsInDropdown.length ? (
                <Dropdown
                    animationVariant="auto-height"
                    position="bottom-center"
                    content={<div className={styles.tabsInDropdown}>{itemsInDropdown.map((i: any) => item(i))}</div>}
                >
                    <Button circle>
                        <Icons variants="menu" />
                    </Button>
                </Dropdown>
            ) : null}
        </div>
    );
}

export default SwitchingNestedPagesOfCompanyPage;
