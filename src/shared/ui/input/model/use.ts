import { useState, useCallback, ChangeEvent, useEffect } from 'react';

import { UseProps } from './types';

const use = ({ initialValue = '', yupSchema, realtimeValidate }: UseProps) => {
    const [value, setValue] = useState(initialValue || '');
    const [error, setError] = useState('');
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value.includes('ㅤ')) {
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
        setError('');
    };

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
    };
};

export default use;
