import React, { forwardRef } from 'react';

import { useDebounce } from 'shared/hooks';

import Icons from './icons';
import styles from './styles.module.scss';
import { SearchProps } from './types';

import { wrapperClasses, getProps } from './index';

const Input = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
    const { debounceDelay, debounceCallback, ...other } = props;

    const { baseProps, inputAttrs } = getProps(other);

    const classes = wrapperClasses(baseProps);

    useDebounce(
        () => {
            debounceCallback && debounceCallback(inputAttrs.value);
        },
        debounceDelay || 2000,
        [inputAttrs.value]
    );

    return (
        <div className={classes}>
            <input onFocus={(event) => event.target.removeAttribute('readOnly')} readOnly ref={ref} className={styles.input} {...inputAttrs} />
            <Icons variants="search" />
        </div>
    );
});

export default Input;
