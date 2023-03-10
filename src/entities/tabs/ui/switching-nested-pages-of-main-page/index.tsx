import React from 'react';
import { useLocation } from 'react-router-dom';

import { useStyles } from 'shared/hooks';
import { Dropdown, Icons, Button } from 'shared/ui';

import TabsIcons from './icons';
import styles from './styles.module.scss';
import { tabsTypes } from '../..';

type Tab = tabsTypes.Tab<any>;

type Props = {
    itemsInRow: Tab[];
    itemsInDropdown: Tab[];
    clickOnTab: (arg: Tab) => void;
    loading: boolean;
};

function SwitchingNestedPagesOfMainPageView(props: Props) {
    const { itemsInDropdown, itemsInRow, clickOnTab, loading } = props;

    const { pathname } = useLocation();

    const classes = (path: string) => {
        return useStyles(styles, 'tab', {
            active: pathname.includes(path),
        });
    };

    const item = (tab: Tab) => (
        <div className={classes(tab.path)} key={tab.id} onClick={() => clickOnTab(tab)}>
            <TabsIcons variants={tab.icon} />
            {tab.text}
        </div>
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

export default SwitchingNestedPagesOfMainPageView;
