import { useEffect, useState } from 'react';

import useSize from './useSize';

type Breakpoints = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

function useMedia(): { breakpoint: Breakpoints } {
    const breakpoints: Record<Breakpoints, number> = {
        sm: 680,
        md: 800,
        lg: 1024,
        xl: 1400,
        xxl: 1401,
    };

    const [breakpoint, setBreakpoints] = useState<Breakpoints>('xl');

    const { width } = useSize();
    useEffect(() => {
        const bp = Object.entries(breakpoints).find(([key, value]) => width < value) || ['xxl'];
        setBreakpoints(bp[0] as Breakpoints);
    }, [width]);

    return { breakpoint };
}

export default useMedia;
