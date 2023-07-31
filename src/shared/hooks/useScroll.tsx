import { ReactNode, RefObject, useEffect, useRef } from 'react';
import { useScroll as scrollPosition } from 'react-use';

type ExecuteScrollToElementProps = { ref: RefObject<any>; disabled?: boolean; smooth?: boolean };

function useScroll(): { executeScrollToElement: (props: ExecuteScrollToElementProps) => void } {
    const executeScrollToElement = ({ ref, smooth, disabled }: ExecuteScrollToElementProps) => {
        if (ref?.current && !disabled) {
            ref.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end', inline: 'nearest' });
        }
    };

    return { executeScrollToElement };
}

export default useScroll;
