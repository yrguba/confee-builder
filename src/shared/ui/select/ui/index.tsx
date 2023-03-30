import React from 'react';
import ReactSwitch from 'react-switch';

import { useToggle } from 'shared/hooks';

import styles from './styles.module.scss';
import Dropdown from '../../dropdown';
import Icons from '../../icons';
import { SelectProps } from '../types';

function Select(props: SelectProps) {
    const { items, defaultValue } = props;

    const [value, toggle] = useToggle();

    const content = (
        <div className={styles.dropdown}>
            {items.map((item) => (
                <div key={item.id} className={styles.item}>
                    {item.title}
                </div>
            ))}
        </div>
    );

    return (
        <Dropdown openCloseTrigger={(isOpen) => toggle(isOpen)} animationVariant="autoHeight" position="bottom-center" content={content}>
            <div className={styles.select}>
                {defaultValue ? items.map((i) => i.title === defaultValue && <div>{i.title}</div>) : <div>{items[0].title}</div>}
                <Icons.ArrowAnimated variants="rotate" />
            </div>
        </Dropdown>
    );
}

export default Select;
