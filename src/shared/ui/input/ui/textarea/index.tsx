import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { forwardRef, useEffect, useRef } from 'react';
import { RichTextarea } from 'rich-textarea';
import { string } from 'yup';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../hooks';
import { replaceEmojis } from '../../../../lib';
import { Emoji } from '../../../index';
import Title from '../../../title';
import { TextareaInputProps } from '../../model/types';

const InputTextarea = forwardRef<HTMLInputElement, TextareaInputProps>((props, ref: any) => {
    const {
        pressEnter,
        pressEnterAndCtrl,
        placeholder,
        textChange,
        value,
        textVariant = 'H4M',
        active,
        width,
        height = 'auto',
        loading,
        error,
        disabled,
        defaultValue,
        focus,
        focusTrigger,
    } = props;

    const wrapperRef = useRef<any>(null);
    const visibleEmojiPicker = useEasyState(false);

    useEffect(() => {
        if (wrapperRef.current && focus) {
            wrapperRef.current.focus();
        }
    }, [focus, ...focusTrigger]);

    useEffect(() => {
        if (wrapperRef.current && typeof value === 'string') {
            const rows = value.split(/\r\n|\r|\n/).length;

            wrapperRef.current.focus();

            const w = 16;
            if (rows > 1 && value.length) {
                wrapperRef.current.style.height = `${rows * w}px`;
                if (rows > 14) {
                    wrapperRef.current.style.height = `${14 * w}px`;
                    // wrapperRef.current.style.overflow = `auto`;
                }
            } else {
                wrapperRef.current.style.height = height;
            }
        }
    }, [value]);

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('wrapper', {
            [textVariant]: textVariant,
            disabled: !textChange,
        })
    );

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                pressEnterAndCtrl && value && pressEnterAndCtrl(value as string);
            } else {
                pressEnter && pressEnter(value as string);
            }
        }
    };

    const onInput = (e: any) => {
        textChange && textChange(e.target.value);
    };

    return (
        <>
            <RichTextarea
                onBlur={() => {
                    if (visibleEmojiPicker.value && wrapperRef.current) {
                        wrapperRef.current.focus();
                    }
                }}
                style={{ width: '100%', height, minHeight: '20px' }}
                className={classes}
                ref={wrapperRef}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                onChange={onInput}
                value={value}
            >
                {(value) => {
                    return (
                        <Title replaceEmoji wordBreak variant={textVariant}>
                            {value}
                        </Title>
                    );
                }}
            </RichTextarea>
            <div style={{ height: '100%', position: 'absolute', bottom: 4, right: 0, display: 'flex', alignItems: 'flex-end' }}>
                <Emoji openCloseTrigger={(value) => visibleEmojiPicker.set(value)} clickOnEmoji={(emoji) => textChange && textChange(`${value} ${emoji}`)} />
            </div>
        </>
    );
});

export default InputTextarea;
