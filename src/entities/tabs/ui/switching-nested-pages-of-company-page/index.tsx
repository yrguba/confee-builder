import React from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Dropdown, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { tabsTypes } from '../..';

type Tab = tabsTypes.Tab<any>;

type Props = {
    itemsInRow: Tab[];
    itemsInDropdown: Tab[];
    clickOnTab: (arg: Tab) => void;
    loading: boolean;
};

function SwitchingNestedPagesOfCompanyPageView(props: Props) {
    const { itemsInDropdown, itemsInRow, clickOnTab, loading } = props;

    const { pathname } = useLocation();

    const item = (tab: Tab) => (
        <Button
            active={pathname.includes(tab.path)}
            disabled={loading}
            loading={loading && pathname.includes(tab.path)}
            key={tab.id}
            onClick={() => clickOnTab(tab)}
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

export default SwitchingNestedPagesOfCompanyPageView;
