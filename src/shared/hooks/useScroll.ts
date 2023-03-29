import { RefObject, useRef } from 'react';

function useScrollTo(): [executeScroll: () => void, ref: RefObject<any>] {
    const ref: any = useRef(null);
    const executeScroll = () => ref.current && ref.current.scrollIntoView();

    return [executeScroll, ref];
}

export default useScrollTo;
