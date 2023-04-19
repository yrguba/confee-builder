import React from 'react';

import { useToggle } from 'shared/hooks';

import styles from './styles.module.scss';
import Dropdown from '../../dropdown';
import Icons from '../../icons';
import { SelectProps } from '../types';

function Select(props: SelectProps) {
    const { items, defaultValue, onChange } = props;

    const [value, toggle] = useToggle();

    const content = (
        <div className={styles.dropdown}>
            {items.map((item) => (
                <div onClick={() => onChange(item.title)} key={item.id} className={`${styles.item} ${item.title === defaultValue ? styles.item_active : ''}`}>
                    {item.title}
                </div>
            ))}
        </div>
    );

    return (
        <Dropdown openCloseTrigger={(isOpen) => toggle(isOpen)} animationVariant="autoHeight" position="bottom-center" content={content}>
            <div className={styles.select}>
                {defaultValue ? items.map((i) => i.title === defaultValue && <div key={i.id}>{i.title}</div>) : <div key={items[0].id}>{items[0].title}</div>}
                <Icons.ArrowAnimated variants="rotate" initialDeg={90} />
            </div>
        </Dropdown>
    );
}

export default Select;
