import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';

import Icons from './icons';
import styles from './wrapper/styles.module.scss';
import Wrapper from './wrapper/wrapper';
import { useDebounce } from '../../../hooks';
import Box from '../../box';
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
        clear,
        ...other
    } = props;

    useDebounce(
        () => {
            debounceCallback && debounceCallback(other.value);
        },
        debounceDelay || 2000,
        [other.value]
    );

    const inputRef = useRef<any>(null);

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
            <input ref={mergeRefs([inputRef, ref])} className={styles.input} {...other} />
            <div onClick={clear} className={styles.clearIcon}>
                {clearIcon && (
                    <Box.Animated visible={!!other?.value}>
                        <Icons variants="clear" />
                    </Box.Animated>
                )}
            </div>
        </Wrapper>
    );
});

export default InputBase;
