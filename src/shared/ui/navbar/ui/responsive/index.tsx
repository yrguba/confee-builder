import React from 'react';

import styles from './styles.module.scss';
import { Button, Dropdown } from '../../../index';
import { ResponsiveNavbarProps } from '../../types';

function ResponsiveNavbar(props: ResponsiveNavbarProps) {
    const { itemsInRow, dropDownProps, itemsInDropdown, item, rowGap = 8, columnGap = 8, btnRadius = 32 } = props;

    const baseIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={btnRadius - 6}
            height={btnRadius - 6}
            enableBackground="new 0 0 32 32"
            version="1.1"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
        >
            <path d="M4 10h24a2 2 0 000-4H4a2 2 0 000 4zm24 4H4a2 2 0 000 4h24a2 2 0 000-4zm0 8H4a2 2 0 000 4h24a2 2 0 000-4z" />
        </svg>
    );
    return (
        <div className={styles.tabs} style={{ columnGap }}>
            {itemsInRow.map((tab) => item(tab))}
            {itemsInDropdown.length ? (
                <Dropdown
                    animationVariant="auto-height"
                    position="bottom-center"
                    {...dropDownProps}
                    content={
                        <div style={{ rowGap }} className={styles.tabsInDropdown}>
                            {itemsInDropdown.map((i) => item(i))}
                        </div>
                    }
                >
                    <Button.Circle active style={{ width: btnRadius, height: btnRadius }}>
                        {baseIcon}
                    </Button.Circle>
                </Dropdown>
            ) : null}
        </div>
    );
}

export default ResponsiveNavbar;
