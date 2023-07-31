import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { useScroll as scrollPosition } from 'react-use';

type ExecuteScrollToElementProps = { ref: RefObject<any>; disabled?: boolean; smooth?: boolean };

function useScroll(): {
    executeScrollToElement: (props: ExecuteScrollToElementProps) => void;
    getScrollPosition: (arg: RefObject<any>) => { x: number; y: number };
} {
    const getScrollPosition = (ref: RefObject<any>) => {
        return scrollPosition(ref);
    };

    const executeScrollToElement = ({ ref, smooth, disabled }: ExecuteScrollToElementProps) => {
        if (ref?.current && !disabled) {
            ref.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end', inline: 'nearest' });
        }
    };

    return { executeScrollToElement, getScrollPosition };
}

export default useScroll;
