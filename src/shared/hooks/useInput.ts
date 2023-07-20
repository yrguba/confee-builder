import { useState, useCallback, ChangeEvent } from 'react';

const useInput = (initialValue = '') => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value.includes('ㅤ')) {
            setValue(e.currentTarget.value);
        }
    }, []);

    const clear = () => {
        setValue('');
    };
    return { value, onChange, clear };
};

export default useInput;
