import { useState, useCallback, ChangeEvent, useEffect, useRef } from 'react';

import { UseProps } from './types';
import { useDebounce } from '../../../hooks';

const use = ({
    initialValue = '',
    yupSchema,
    realtimeValidate,
    callback,
    debounceDelay,
    callbackPhone,
    onFocus,
    onlyType,
    resetFocusError = true,
}: UseProps) => {
    const firstRender = useRef(true);
    const [value, setValue] = useState(initialValue || '');
    const [error, setError] = useState('');
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (onlyType === 'number') {
            if (/^[0-9]+$|^$/.test(e.currentTarget.value)) {
                setValue(e.currentTarget.value);
            }
        } else if (!e.currentTarget.value.includes('ㅤ')) {
            setValue(e.currentTarget.value);
        }
    }, []);

    const clear = () => {
        setValue('');
        setError('');
    };

    const reload = () => {
        setValue(initialValue);
        setError('');
    };

    useEffect(() => {
        initialValue && setValue(initialValue);
    }, [initialValue]);

    const asyncValidate = async (): Promise<{ error: string; value: string }> => {
        try {
            yupSchema && (await yupSchema.validate(value));
            setError('');
            return { error: '', value };
        } catch (err: any) {
            setError(err.errors[0]);
            return { error: err.errors[0], value };
        }
    };

    useEffect(() => {
        if (realtimeValidate) {
            asyncValidate().then();
        }
    }, [realtimeValidate, value]);

    const onFocusClearError = () => {
        !onFocus && resetFocusError && setError('');
    };

    useDebounce(
        () => {
            callback && !firstRender.current && callback(value);
        },
        debounceDelay || 0,
        [value]
    );

    useEffect(() => {
        if (value) firstRender.current = false;
    }, [value]);

    return {
        value,
        error: !!error,
        onChange,
        clear,
        errorTitle: error,
        asyncValidate,
        onFocus: onFocusClearError,
        setError,
        reload,
        callbackPhone,
        focus: onFocus,
    };
};

export default use;
