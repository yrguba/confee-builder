import { produce, freeze } from 'immer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrevious } from 'react-use';

type UseEasyStateReturnType<T> = {
    value: T;
    set: (newState: T | ((state: T) => void), callback?: ((state: T) => void) | undefined) => void;
    prevValue: T | undefined;
    toggle: T extends boolean ? () => void : undefined;
};

const useEasyState = <T>(initial: T, updateTrigger?: (value: T) => void): UseEasyStateReturnType<T> => {
    const [state, setState] = useState<T>(() => freeze(typeof initial === 'function' ? initial() : initial, true));

    const prevValue = usePrevious<T>(state);

    const callbackRef = useRef<((state: T) => void) | undefined | null>();

    const set = useCallback((newState: ((state: T) => void) | T, callback?: (state: T) => void) => {
        callbackRef.current = callback;
        // @ts-ignore
        if (typeof newState === 'function') setState(produce(newState));
        else {
            setState(freeze(newState));
            updateTrigger && updateTrigger(freeze(newState));
        }
    }, []);

    const toggle = () => {
        if (typeof state === 'boolean') {
            // @ts-ignore
            setState(!state);
            // @ts-ignore
            updateTrigger && updateTrigger(!state);
        }
    };

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
        // @ts-ignore
        toggle: typeof state === 'boolean' ? toggle : undefined,
    };
};

export type { UseEasyStateReturnType };

export default useEasyState;
