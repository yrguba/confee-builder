import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import styles from './styles.module.scss';
import { TextareaInputProps } from '../../model/types';

const InputTextarea = forwardRef<HTMLInputElement, TextareaInputProps>((props, ref: any) => {
    const { textVariant = '', active, width, height, loading, error, disabled, defaultValue, focus, focusTrigger, ...other } = props;

    const textAreaRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (textAreaRef.current && focus) {
            textAreaRef.current.focus();
        }
    }, [focus, ...focusTrigger]);

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
    const cx = cnBind.bind(styles);
    const classes = cn(
        cx('wrapper', {
            [textVariant]: textVariant,
        })
    );

    return <textarea defaultValue={defaultValue} ref={mergeRefs([ref, textAreaRef])} className={classes} {...other} />;
});

export default InputTextarea;
