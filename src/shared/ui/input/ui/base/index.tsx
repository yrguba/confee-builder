import React, { forwardRef, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useUpdateEffect } from 'react-use';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { useClickAway, useDebounce } from '../../../../hooks';
import Box from '../../../box';
import Icons from '../../../icons';
import { BaseInputProps } from '../../model/types';

const InputBase = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
    const {
        active,
        debounceCallback,
        debounceDelay,
        prefix = '',
        prefixIcon,
        title,
        errorTitle,
        loading,
        error,
        clearIcon,
        size = 's',
        disabled,
        width = '100%',
        height,
        clear,
        reload,
        asyncValidate,
        setError,
        callbackPhone,
        focus,
        ...other
    } = props;

    useDebounce(
        () => {
            debounceCallback && debounceCallback(other.value);
        },
        debounceDelay || 2000,
        [other.value]
    );
    const [focused, setFocused] = useState(false);
    const [focusedClearIcon, setFocusedClearIcon] = useState(false);

    const inputRef = useRef<any>(null);

    const onFocus = () => {
        setFocused(true);
        focus && focus(true);
    };
    const onBlur = () => {
        // if (!focusedClearIcon) {
        //     setFocused(false);
        //     focus && focus(false);
        // }
    };

    useClickAway(inputRef, () => {
        if (!focusedClearIcon && focused) {
            setFocused(false);
            focus && focus(false);
        }
    });

    const classes = useStyles(styles, 'inputWrapper', {
        loading,
        error,
        search: prefixIcon === 'search',
        [`size-${size}`]: size,
        focused,
    });

    const clickClear = () => {
        setFocusedClearIcon(false);
        clear && clear();
    };

    return (
        <div className={styles.wrapper} style={{ width, height }}>
            <div className={styles.title}>{title}</div>
            <div className={classes} onFocus={onFocus} onBlur={onBlur}>
                {prefixIcon && (
                    <div className={styles.prefixIcon}>
                        <Icons variant={prefixIcon} />
                    </div>
                )}
                {prefix && <div className={styles.inputPrefix}>{prefix}</div>}
                <input
                    ref={mergeRefs([inputRef, ref])}
                    className={styles.input}
                    {...other}
                    placeholder={prefixIcon === 'search' ? 'Поиск' : other.placeholder}
                />

                <Box.Animated
                    onMouseLeave={() => setFocusedClearIcon(false)}
                    onMouseEnter={() => setFocusedClearIcon(true)}
                    onClick={clickClear}
                    className={styles.clearIcon}
                    visible={!!clearIcon && !!other?.value && focused}
                >
                    <Icons variant="close" />
                </Box.Animated>
            </div>
            <Box.Animated animationVariant="autoHeight" visible={!!errorTitle} className={styles.errorTitle}>
                {errorTitle}
            </Box.Animated>
        </div>
    );
});

export default InputBase;
