import { RefObject } from 'react';

type ExecuteScrollToElementProps = { ref: RefObject<any>; enable?: boolean; smooth?: boolean; block?: 'start' | 'center' | 'end' };
type ScrollBottomProps = ExecuteScrollToElementProps;
function useScroll(): {
    executeScrollToElement: (props: ExecuteScrollToElementProps) => void;
    getScrollPosition: (arg: RefObject<any>) => { top: number; bottom: number; right: number; left: number } | undefined;
    scrollBottom: (props: ScrollBottomProps) => void;
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

    const executeScrollToElement = ({ ref, smooth, enable = true, block = 'end' }: ExecuteScrollToElementProps) => {
        if (ref?.current && enable) {
            ref.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block, inline: 'nearest' });
        }
    };

    const scrollBottom = ({ ref, smooth, enable }: ScrollBottomProps) => {
        if (ref?.current && enable) {
            ref?.current.scrollTo({ top: ref?.current.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
        }
    };

    return { executeScrollToElement, getScrollPosition, scrollBottom };
}

export default useScroll;
