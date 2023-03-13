import React from 'react';

import styles from './styles.module.scss';
import { BaseNavbarProps } from '../../types';

function BaseNavbar(props: BaseNavbarProps) {
    const { item, items, direction = 'row', gap, align = 'start' } = props;

    return (
        <div className={styles[direction]} style={{ gap, alignItems: align }}>
            {items.map((tab) => item(tab))}
        </div>
    );
}

export default BaseNavbar;
