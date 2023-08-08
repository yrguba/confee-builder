import { RefObject } from 'react';

type ExecuteScrollToElementProps = { ref: RefObject<any>; enable?: boolean; smooth?: boolean };

function useScroll(): {
    executeScrollToElement: (props: ExecuteScrollToElementProps) => void;
    getScrollPosition: (arg: RefObject<any>) => { top: number; bottom: number; right: number; left: number } | undefined;
} {
    const getScrollPosition = (ref: RefObject<any>): { top: number; bottom: number; right: number; left: number } | undefined => {
        if (ref.current) {
            const target = ref.current as HTMLDivElement;
            const bottom = Math.floor(target.scrollHeight - target.scrollTop - target.clientHeight);
            return {
                top: target.scrollTop < 0 ? 0 : Math.floor(target.scrollTop),
                bottom: bottom < 0 ? 0 : bottom,
                left: 0,
                right: 0,
            };
        }
    };

    const executeScrollToElement = ({ ref, smooth, enable }: ExecuteScrollToElementProps) => {
        if (ref?.current && enable) {
            ref.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end', inline: 'nearest' });
        }
    };

    return { executeScrollToElement, getScrollPosition };
}

export default useScroll;
