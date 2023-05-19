import React, { forwardRef } from 'react';

import { useDebounce } from 'shared/hooks';

import Icons from './icons';
import styles from './wrapper/styles.module.scss';
import Wrapper from './wrapper/wrapper';
import Button from '../../button';
import { SearchInputProps, InputValue } from '../types';

const Input = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
    const { debounceDelay, debounceCallback, active, title, errorTitle, width, height, loading, error, size, mini, disabled, ...other } = props;

    useDebounce(
        () => {
            debounceCallback && debounceCallback(other.value);
        },
        debounceDelay || 2000,
        [other.value]
    );

    return mini ? (
        <Button.Circle active>
            <Icons variants="search" color="#fff" />
        </Button.Circle>
    ) : (
        <Wrapper width={width} height={height} size={size} title={title} errorTitle={errorTitle}>
            <input ref={ref} className={styles.input} {...other} />
            <Icons variants="search" />
        </Wrapper>
    );
});

export default Input;
