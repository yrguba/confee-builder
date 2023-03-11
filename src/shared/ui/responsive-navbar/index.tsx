import React from 'react';

import styles from './styles.module.scss';
import { Props } from './types';
import { Button, Dropdown, Icons } from '../index';

function ResponsiveNavbar(props: Props) {
    const { itemsInRow, itemsInDropdown, item } = props;

    return (
        <div className={styles.tabs}>
            {itemsInRow.map((tab) => item(tab))}
            {itemsInDropdown.length ? (
                <Dropdown
                    animationVariant="auto-height"
                    position="bottom-center"
                    content={<div className={styles.tabsInDropdown}>{itemsInDropdown.map((i) => item(i))}</div>}
                >
                    <Button circle>
                        <Icons variants="menu" />
                    </Button>
                </Dropdown>
            ) : null}
        </div>
    );
}

export default ResponsiveNavbar;
