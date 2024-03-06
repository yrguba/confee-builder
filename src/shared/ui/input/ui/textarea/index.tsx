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
        lineBreak,
    } = props;

    const wrapperRef = useRef<any>(null);
    const visibleEmojiPicker = useEasyState(false);
    const cursorPosition = useEasyState(0);

    useEffect(() => {
        if (wrapperRef.current && focus) {
            wrapperRef.current.focus();
        }
    }, [focus, ...focusTrigger]);

    useEffect(() => {
        if (wrapperRef.current && typeof value === 'string') {
            const rows = value.split(/\r\n|\r|\n/).length;

            const w = 20;
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
                pressEnterAndCtrl && value && pressEnterAndCtrl(value as string, cursorPosition.value);
                if (lineBreak && textChange && typeof value === 'string') {
                    textChange([value.slice(0, cursorPosition.value), '\n', value.slice(cursorPosition.value)].join(''));
                }
            } else {
                pressEnter && pressEnter(value as string);
            }
        }
    };

    const onInput = (e: any) => {
        textChange && textChange(e.target.value);
    };

    const openCloseTrigger = (value: boolean) => {
        visibleEmojiPicker.set(value);
        if (!visibleEmojiPicker.value && wrapperRef.current) {
            // wrapperRef.current.focus();
        }
    };

    const clickEmoji = (emoji: any) => {
        if (textChange && typeof value === 'string') {
            wrapperRef.current.focus();
            textChange([value.slice(0, cursorPosition.value), emoji, value.slice(cursorPosition.value)].join(''));
        }
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
                onSelect={(e) => {
                    cursorPosition.set(e.currentTarget.selectionStart);
                }}
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
                <Emoji openCloseTrigger={openCloseTrigger} clickOnEmoji={clickEmoji} />
            </div>
        </>
    );
});

export default InputTextarea;
