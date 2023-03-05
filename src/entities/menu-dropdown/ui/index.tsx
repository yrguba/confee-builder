import React from 'react';

import styles from './styles.module.scss';
import { menuDropdownTypes } from '..';

type Props = {
    items: menuDropdownTypes.MenuItem[];
};

function DropdownMenu(props: Props) {
    const { items } = props;

    return (
        <div className={styles.menu}>
            {items.map((item) => (
                <div className={styles.item} key={item.id}>
                    {item.title}
                </div>
            ))}
        </div>
    );
}

export default DropdownMenu;
