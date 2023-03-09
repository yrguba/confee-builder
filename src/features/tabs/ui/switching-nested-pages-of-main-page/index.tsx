import React, { useRef, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStyles, useSize } from 'shared/hooks';
import { routing_tree } from 'shared/routing';
import { Dropdown } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { tabsTypes } from '../..';

type Routing = keyof typeof routing_tree.main;
type Tab = tabsTypes.Tab<Routing>;

type Props = {
    dropdown?: boolean;
};

function SwitchingNestedPagesOfMainPage(props: Props) {
    const { dropdown } = props;

    const wrapperRef = useRef(null);

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const suffixPath = pathname.split('/').pop();

    const [isPending, startTransition] = useTransition();
    const a = useSize();
    console.log(a);
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

    // if (dropdown) {
    //     return (
    //         <Dropdown animationVariant="auto-height" position="bottom-center" content={<div className={styles.tabsRow}>{content}</div>}>
    //             <div className={styles.menuIcon}>
    //                 <Icons variants="menu" />
    //             </div>
    //         </Dropdown>
    //     );
    // }

    return (
        <div className={styles.tabs} ref={wrapperRef}>
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
