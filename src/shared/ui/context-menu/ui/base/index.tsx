import React, { useEffect, useRef } from 'react';

import { Box, Dropdown } from 'shared/ui/index';

import styles from './styles.module.scss';
import { useClickAway } from '../../../../hooks';
import { BaseContextMenuProps } from '../../types';

function ContextMenu(props: BaseContextMenuProps) {
    const { mouseLeave, trigger, visible, items, disabled, ...dropDownProps } = props;

    return (
        <Dropdown
            {...dropDownProps}
            visible={visible}
            trigger={trigger}
            content={
                <div onMouseLeave={mouseLeave} className={styles.wrapper}>
                    {items.map((i) => (
                        <div
                            key={i.id}
                            className={styles.item}
                            onClick={(e) => {
                                e.stopPropagation();
                                i.callback();
                            }}
                        >
                            <div className={`${styles.content} ${i.isRed && styles.content_red}`}>
                                <div>{i.icon}</div>
                                <div>{i.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        />
    );
}

export default ContextMenu;
