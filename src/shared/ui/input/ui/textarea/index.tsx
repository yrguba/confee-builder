import React, { forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import styles from './styles.module.scss';
import { TextareaInputProps } from '../../model/types';

const InputTextarea = forwardRef<HTMLInputElement, TextareaInputProps>((props, ref: any) => {
    const { active, width, height, loading, error, disabled, defaultValue, focus, id, ...other } = props;

    const textAreaRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textAreaRef.current && focus) {
            textAreaRef.current.focus();
        }
    }, [focus, id]);

    useEffect(() => {
        if (textAreaRef.current && typeof other.value === 'string') {
            const rows = other.value.split(/\r\n|\r|\n/).length;
            if (rows > 1) {
                textAreaRef.current.style.height = `${rows * 17.3}px`;
                if (rows > 14) {
                    textAreaRef.current.style.height = `${12 * 17.3}px`;
                }
            } else {
                textAreaRef.current.style.height = `auto`;
            }
        }
    }, [other?.value]);

    return <textarea ref={mergeRefs([ref, textAreaRef])} className={styles.wrapper} placeholder="Ваше сообщение" {...other} />;
});

export default InputTextarea;
