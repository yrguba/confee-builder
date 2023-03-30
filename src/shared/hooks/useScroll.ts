import { RefObject, useEffect, useRef } from 'react';

type Options = { top?: number; left?: number };

function useScrollTo(): [executeScroll: (options: Options) => void, ref: RefObject<any>] {
    const ref: any = useRef(null);

    const executeScroll = (options: Options) => {
        if (options?.left) {
            if (ref.current) {
                ref.current.scroll({ left: options.left, behavior: 'smooth' });
            }
        } else {
            ref.current && ref.current.scrollIntoView();
        }
    };

    return [executeScroll, ref];
}

export default useScrollTo;
