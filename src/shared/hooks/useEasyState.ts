import { produce, freeze } from 'immer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrevious } from 'react-use';

const useEasyState = <T>(initial: T) => {
    const [state, setState] = useState<T>(() => freeze(typeof initial === 'function' ? initial() : initial, true));

    const prevValue = usePrevious<T>(state);

    const callbackRef = useRef<((state: T) => void) | undefined | null>();

    const set = useCallback((newState: ((state: T) => void) | T, callback?: (state: T) => void) => {
        callbackRef.current = callback;
        // @ts-ignore
        if (typeof newState === 'function') setState(produce(newState));
        else {
            setState(freeze(newState));
        }
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
