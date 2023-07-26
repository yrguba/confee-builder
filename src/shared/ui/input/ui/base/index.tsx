import React, { forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { useDebounce } from '../../../../hooks';
import Box from '../../../box';
import { BaseInputProps } from '../../types';
import Icons from '../icons';

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
        asyncValidate,
        setError,
        ...other
    } = props;

    useDebounce(
        () => {
            debounceCallback && debounceCallback(other.value);
        },
        debounceDelay || 2000,
        [other.value]
    );
    const [focused, setFocused] = React.useState(false);
    const inputRef = useRef<any>(null);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const classes = useStyles(styles, 'inputWrapper', {
        loading,
        error,
        search: prefixIcon === 'search',
        [`size-${size}`]: size,
        focused,
    });

    return (
        <div className={styles.wrapper} style={{ width, height }}>
            <div className={styles.title}>{title}</div>
            <div className={classes} onFocus={onFocus} onBlur={onBlur}>
                {prefixIcon && (
                    <div className={styles.prefixIcon}>
                        <Icons variants={prefixIcon} />
                    </div>
                )}
                {prefix && <div className={styles.inputPrefix}>{prefix}</div>}
                <input ref={mergeRefs([inputRef, ref])} className={styles.input} {...other} />
                <div onClick={clear} className={styles.clearIcon}>
                    {clearIcon && (
                        <Box.Animated visible={!!other?.value}>
                            <Icons variants="clear" />
                        </Box.Animated>
                    )}
                </div>
            </div>
            <Box.Animated animationVariant="autoHeight" visible={!!errorTitle} className={styles.errorTitle}>
                {errorTitle}
            </Box.Animated>
        </div>
    );
});

export default InputBase;
