import { useEffect, useState } from 'react';

function useCallbackRef<T extends HTMLElement>(callback: (element: T | null) => void) {
    const [refState, setRefState] = useState<T | null>(null);

    const ref = (data: any) => {
        setRefState(data);
    };

    useEffect(() => {
        callback(refState || null);
    }, [refState]);

    return ref;
}
export default useCallbackRef;
