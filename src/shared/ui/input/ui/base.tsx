import React, { forwardRef, useEffect, useState } from 'react';

import Icons from './icons';
import styles from './wrapper/styles.module.scss';
import Wrapper from './wrapper/wrapper';
import { useDebounce } from '../../../hooks';
import { BaseInputProps } from '../types';

const InputBase = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
    const {
        active,
        debounceCallback,
        debounceDelay,
        prefix = '',
        title,
        errorTitle,
        loading,
        error,
        clearIcon,
        size,
        disabled,
        width,
        height,
        ...other
    } = props;

    useDebounce(
        () => {
            debounceCallback && debounceCallback(other.value);
        },
        debounceDelay || 2000,
        [other.value]
    );

    return (
        <Wrapper
            width={width}
            height={height}
            title={title}
            errorTitle={errorTitle}
            loading={loading}
            error={error}
            size={size}
            disabled={disabled}
            active={active}
        >
            {prefix && <div className={styles.inputPrefix}>{prefix}</div>}
            <input value={other.value} ref={ref} className={styles.input} {...other} />
            {clearIcon && <Icons variants="clear" />}
        </Wrapper>
    );
});

export default InputBase;
