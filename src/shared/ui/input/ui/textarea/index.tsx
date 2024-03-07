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
        height = '26px',
        loading,
        error,
        disabled,
        defaultValue,
        focus,
        focusTrigger,
        lineBreak,
        visibleEmoji,
    } = props;

    const inputRef = useRef<any>(null);
    const wrapperRef = useRef<any>(null);
    const visibleEmojiPicker = useEasyState(false);
    const cursorPosition = useEasyState(0);

    useEffect(() => {
        if (inputRef.current && focus) {
            inputRef.current.focus();
        }
    }, [focus, ...focusTrigger]);

    useEffect(() => {
        if (inputRef.current && typeof value === 'string') {
            inputRef.current.style.height = `auto`;
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [value]);

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('input', {
            [textVariant]: textVariant,
            disabled: !textChange,
        })
    );

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                pressEnterAndCtrl && value && pressEnterAndCtrl(value as string, cursorPosition.value);
                if (lineBreak && textChange && typeof value === 'string' && value) {
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
        <div className={styles.wrapper} ref={wrapperRef} style={{ height, minHeight: '20px' }}>
            <RichTextarea
                onBlur={() => {
                    if (visibleEmojiPicker.value && inputRef.current) {
                        inputRef.current.focus();
                    }
                }}
                style={{ width: '100%', height: '100%' }}
                className={classes}
                ref={inputRef}
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
            {visibleEmoji && (
                <div className={styles.emoji}>
                    <Emoji openCloseTrigger={openCloseTrigger} clickOnEmoji={clickEmoji} />
                </div>
            )}
        </div>
    );
});

export default InputTextarea;
