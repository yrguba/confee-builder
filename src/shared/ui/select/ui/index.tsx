import React from 'react';

import { useStyles, useToggle } from 'shared/hooks';

import styles from './styles.module.scss';
import Icons from '../../icons';
import { SelectProps } from '../types';

function Select(props: SelectProps) {
    const { items, defaultValue, variant = 'inherit' } = props;

    const [value, toggle] = useToggle();
    const classes = useStyles(styles, 'select', {
        [variant]: variant,
    });
    return (
        <div className={classes}>
            {defaultValue ? items.map((i) => i.title === defaultValue && <div key={i.id}>{i.title}</div>) : <div key={items[0].id}>{items[0].title}</div>}
            <Icons.ArrowAnimated variant="rotate" initialDeg={90} />
        </div>
    );
}

export default Select;
