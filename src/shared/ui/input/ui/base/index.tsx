import React, { forwardRef, useRef } from 'react';
import { mergeRefs } from 'react-merge-refs';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { useDebounce } from '../../../../hooks';
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
    const [focused, setFocused] = React.useState(false);
    const inputRef = useRef<any>(null);

    const onFocus = () => {
        setFocused(true);
        focus && focus(true);
    };
    const onBlur = () => {
        setFocused(false);
        focus && focus(false);
    };

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

                <Box.Animated onClick={clear} className={styles.clearIcon} visible={!!clearIcon && !!other?.value}>
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
