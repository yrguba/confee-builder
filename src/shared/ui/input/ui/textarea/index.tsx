import React, { forwardRef, useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import { TextareaInputProps } from '../../model/types';

const InputTextarea = forwardRef<HTMLInputElement, TextareaInputProps>((props, ref: any) => {
    const { active, width, height, loading, error, disabled, ...other } = props;

    return <textarea ref={ref} className={styles.wrapper} placeholder="Ваше сообщение" {...other} />;
});

export default InputTextarea;
