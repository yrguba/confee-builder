import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import { DropdownMenuProps } from '../types';

import Dropdown from './index';

function DropdownMenu(props: DropdownMenuProps) {
    const { items, ...other } = props;

    return (
        <Dropdown
            {...other}
            content={
                <div className={styles.dropdownMenu}>
                    {items.map((i) => (
                        <div key={i.id} className={styles.item} onClick={i.action}>
                            <div className={`${styles.content} ${i.isRed && styles.content_red}`}>
                                <div>{i.icon}</div>
                                <div>{i.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        >
            {other.children}
        </Dropdown>
    );
}

export default DropdownMenu;
