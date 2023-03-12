import React, { forwardRef } from 'react';

import styles from './wrapper/styles.module.scss';
import Wrapper from './wrapper/wrapper';
import { BaseInputProps } from '../types';

const InputBase = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
    const { active, loading, error, size, disabled, ...other } = props;

    return (
        <Wrapper loading={loading} error={error} size={size} disabled={disabled} active={active}>
            <input ref={ref} className={styles.input} {...other} />
        </Wrapper>
    );
});

export default InputBase;
