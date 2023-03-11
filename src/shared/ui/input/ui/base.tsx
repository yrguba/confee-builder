import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { getBase } from '..';
import { InputComponentProps } from '../types';

const InputBase = forwardRef<HTMLInputElement, InputComponentProps>((props, ref) => {
    const { classes, inputAttrs } = getBase(props);

    return (
        <div className={classes}>
            <input ref={ref} className={styles.input} {...inputAttrs} />
        </div>
    );
});

export default InputBase;
