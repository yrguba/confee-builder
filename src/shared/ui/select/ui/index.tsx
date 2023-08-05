import React from 'react';

import { useToggle } from 'shared/hooks';

import styles from './styles.module.scss';
import DropdownMenu from '../../dropdown/ui/menu';
import Icons from '../../icons';
import { SelectProps } from '../types';

function Select(props: SelectProps) {
    const { items, defaultValue } = props;

    const [value, toggle] = useToggle();

    return (
        <DropdownMenu items={items} openCloseTrigger={(isOpen) => toggle(isOpen)} animationVariant="autoHeight" position="bottom-center">
            <div className={styles.select}>
                {defaultValue ? items.map((i) => i.title === defaultValue && <div key={i.id}>{i.title}</div>) : <div key={items[0].id}>{items[0].title}</div>}
                <Icons.ArrowAnimated variant="rotate" initialDeg={90} />
            </div>
        </DropdownMenu>
    );
}

export default Select;
