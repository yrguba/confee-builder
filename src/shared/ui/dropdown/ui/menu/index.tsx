import React from 'react';

import styles from './styles.module.scss';
import { DropdownMenuItem } from '../../types';

type Props = {
    items: DropdownMenuItem[];
};

function Menu(props: Props) {
    const { items } = props;

    return (
        <div className={styles.wrapper}>
            {items.map((item) => (
                <div key={item.id} className={styles.item} onClick={item.onclick}>
                    <div className={styles.content}>
                        {item.icon}
                        {item.title}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Menu;
