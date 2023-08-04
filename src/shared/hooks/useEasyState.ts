import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrevious } from 'react-use';

const useEasyState = <T>(initial: T) => {
    const [state, setState] = useState<T>(initial);

    const prevValue = usePrevious(state);

    const callbackRef: any = useRef();

    const set = useCallback((newState: T, callback?: () => void) => {
        callbackRef.current = callback;
        setState((prev) => (typeof newState === 'function' ? newState(prev) : newState));
    }, []);

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state);
            callbackRef.current = null;
        }
    }, [state]);

    return {
        value: state,
        set,
        prevValue,
    };
};

export type UseEasyStateReturnedType<T> = ReturnType<typeof useEasyState<T>>;

export default useEasyState;
