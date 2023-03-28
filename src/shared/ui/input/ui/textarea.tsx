import React, { forwardRef } from 'react';

import styles from './styles.module.scss';
import { TextareaInputProps } from '../types';

const InputTextarea = forwardRef<HTMLInputElement, TextareaInputProps>((props, ref) => {
    const { active, loading, error, disabled, ...other } = props;

    return <textarea className={styles.textarea} {...other} />;
});

export default InputTextarea;
