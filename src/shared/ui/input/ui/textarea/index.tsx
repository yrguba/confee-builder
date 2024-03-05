import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { forwardRef, useEffect, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import styles from './styles.module.scss';
import { TextareaInputProps } from '../../model/types';

const InputTextarea = forwardRef<HTMLInputElement, TextareaInputProps>((props, ref: any) => {
    const {
        pressEnter,
        pressEnterAndCtrl,
        placeholder,
        textChange,
        value,
        textVariant = '',
        active,
        width,
        height,
        loading,
        error,
        disabled,
        defaultValue,
        focus,
        focusTrigger,
    } = props;

    const wrapperRef = useRef<any>(null);
    const textAreaRef = useRef<any>(null);
    useEffect(() => {
        if (textAreaRef.current && focus) {
            textAreaRef.current.focus();
        }
    }, [focus, ...focusTrigger]);

    useEffect(() => {
        if (textAreaRef.current && wrapperRef.current && typeof value === 'string') {
            const rows = value.split(/\r\n|\r|\n/).length;
            if (rows > 1) {
                wrapperRef.current.style.height = `${rows * 17.3}px`;
                if (rows > 14) {
                    wrapperRef.current.style.height = `${12 * 17.3}px`;
                }
            } else {
                wrapperRef.current.style.height = `auto`;
            }
            textAreaRef.current.textContent = value;
        }
    }, [value]);

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('wrapper', {
            [textVariant]: textVariant,
        })
    );

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                pressEnterAndCtrl && pressEnterAndCtrl(value as string);
            } else {
                pressEnter && pressEnter(value as string);
            }
        }
    };

    const onInput = (e: any) => {
        textChange && textChange(e.target.value);
    };

    return (
        <div className={classes} ref={wrapperRef}>
            {value}
            <textarea className={styles.textArea} ref={textAreaRef} onKeyDown={onKeyDown} placeholder={placeholder} onChange={onInput} value={value} />
        </div>
    );
});

export default InputTextarea;
