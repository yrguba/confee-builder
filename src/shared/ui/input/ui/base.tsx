import React, { forwardRef } from 'react';

import styles from './wrapper/styles.module.scss';
import Wrapper from './wrapper/wrapper';
import { BaseInputProps } from '../types';

const InputBase = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
    const { active, title, errorTitle, loading, error, size, disabled, width, height, ...other } = props;

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
            <input ref={ref} className={styles.input} {...other} />
        </Wrapper>
    );
});

export default InputBase;
