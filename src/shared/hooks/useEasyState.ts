import { useState } from 'react';
import { usePrevious } from 'react-use';

const useEasyState = <T>(initial: T) => {
    const [state, setState] = useState<T>(initial);
    const prevValue = usePrevious(state);

    return {
        value: state,
        set: setState,
        prevValue,
    };
};

export type UseEasyStateReturnedType<T> = ReturnType<typeof useEasyState<T>>;

export default useEasyState;
