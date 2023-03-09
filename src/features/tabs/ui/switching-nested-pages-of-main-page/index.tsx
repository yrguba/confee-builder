import React, { useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStyles } from 'shared/hooks';
import { routing_tree } from 'shared/routing';

import Icons from './icons';
import styles from './styles.module.scss';
import { tabsTypes } from '../..';

type Routing = keyof typeof routing_tree.main;
type Tab = tabsTypes.Tab<Routing>;

function SwitchingNestedPagesOfMainPage() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const suffixPath = pathname.split('/').pop();

    const [isPending, startTransition] = useTransition();

    const tabs: Tab[] = [
        { id: 0, text: 'Компания', icon: <Icons variants="company" />, path: 'company' },
        { id: 1, text: 'Чаты и каналы', icon: <Icons variants="chats" />, path: 'chats' },
        { id: 2, text: 'Задачи', icon: <Icons variants="tasks" />, path: 'tasks' },
    ];

    const classes = (path: Routing) => {
        return useStyles(styles, 'tab', {
            active: suffixPath === path,
        });
    };

    const tabClick = (path: Routing) => {
        startTransition(() => navigate(path));
    };

    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <div className={classes(tab.path)} key={tab.id} onClick={() => tabClick(tab.path)}>
                    {tab.icon}
                    {tab.text}
                </div>
            ))}
        </div>
    );
}

export default SwitchingNestedPagesOfMainPage;
