import { useState, useCallback, ChangeEvent, useEffect } from 'react';

type Props = {
    initialValue?: string;
    yupSchema?: any;
    realtimeValidate?: boolean;
};

const useInput = (props?: Props) => {
    const [value, setValue] = useState(props?.initialValue || '');
    const [error, setError] = useState('');
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value.includes('ㅤ')) {
            setValue(e.currentTarget.value);
        }
    }, []);

    const clear = () => {
        setValue('');
    };

    const asyncValidate = async (): Promise<{ error: string; value: string }> => {
        try {
            props?.yupSchema && (await props?.yupSchema.validate(value));
            setError('');
            return { error: '', value };
        } catch (err: any) {
            setError(err.errors[0]);
            return { error: err.errors[0], value };
        }
    };

    useEffect(() => {
        if (props?.realtimeValidate) {
            asyncValidate().then();
        }
    }, [props?.realtimeValidate, value]);

    const onFocusClearError = () => {
        setError('');
    };

    return { value, error: !!error, onChange, clear, errorTitle: error, asyncValidate, onFocus: onFocusClearError, setError };
};

export default useInput;
