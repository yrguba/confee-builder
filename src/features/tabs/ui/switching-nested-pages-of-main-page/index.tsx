import React, { useRef, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStyles, useRowAndDropdown } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Dropdown, Icons, Button } from 'shared/ui';

import TabsIcons from './icons';
import styles from './styles.module.scss';
import { tabsTypes } from '../..';

type Routing = keyof typeof routing_tree.main;
type Tab = tabsTypes.Tab<Routing>;

function SwitchingNestedPagesOfMainPage() {
    const wrapperRef = useRef(null);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const suffixPath = pathname.split('/').pop();

    const [isPending, startTransition] = useTransition();

    const tabs: Tab[] = [
        { id: 0, text: 'Компания', icon: <TabsIcons variants="company" />, path: 'company', breakpoint: 500 },
        { id: 1, text: 'Чаты и каналы', icon: <TabsIcons variants="chats" />, path: 'chats', breakpoint: 600 },
        { id: 2, text: 'Задачи', icon: <TabsIcons variants="tasks" />, path: 'tasks', breakpoint: 800 },
    ];

    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<Tab>(tabs);

    const classes = (path: Routing) => {
        return useStyles(styles, 'tab', {
            active: suffixPath === path,
        });
    };

    const tabClick = (path: Routing) => {
        startTransition(() => navigate(path));
    };

    const item = (tab: Tab) => (
        <div className={classes(tab.path)} key={tab.id} onClick={() => tabClick(tab.path)}>
            {tab.icon}
            {tab.text}
        </div>
    );

    return (
        <div className={styles.tabs} ref={wrapperRef}>
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

export default SwitchingNestedPagesOfMainPage;
