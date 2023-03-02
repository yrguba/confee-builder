import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { InputProps } from './types';

import { getProps, wrapperClasses } from '.';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { baseProps, inputAttrs } = getProps(props);

    const classes = wrapperClasses(baseProps);

    return (
        <div className={classes}>
            <input onFocus={(event) => event.target.removeAttribute('readOnly')} readOnly ref={ref} className={styles.input} {...inputAttrs} />
        </div>
    );
});

export default Input;
