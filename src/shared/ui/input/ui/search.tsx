import React, { forwardRef } from 'react';

import { useDebounce } from 'shared/hooks';

import Icons from './icons';
import styles from './wrapper/styles.module.scss';
import Wrapper from './wrapper/wrapper';
import { SearchInputProps, InputValue } from '../types';

const Input = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
    const { debounceDelay, debounceCallback, active, title, errorTitle, loading, error, size, disabled, ...other } = props;

    useDebounce(
        () => {
            debounceCallback && debounceCallback(other.value);
        },
        debounceDelay || 2000,
        [other.value]
    );

    return (
        <Wrapper title={title} errorTitle={errorTitle}>
            <input ref={ref} className={styles.input} {...other} />
            <Icons variants="search" />
        </Wrapper>
    );
});

export default Input;
