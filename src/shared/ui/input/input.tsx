import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { InputComponentProps } from './types';

import { getBase } from '.';

const Input = forwardRef<HTMLInputElement, InputComponentProps>((props, ref) => {
    const { classes, inputAttrs } = getBase(props);

    return (
        <div className={classes}>
            <input ref={ref} className={styles.input} {...inputAttrs} />
        </div>
    );
});

export default Input;
