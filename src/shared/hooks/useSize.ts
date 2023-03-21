import { RefObject, useEffect, useState, useCallback } from 'react';

function useSize(ref?: RefObject<any>) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const root = document.querySelector('#root');

        const getDimensions = () => {
            if (ref?.current) {
                return {
                    width: (ref && ref.current.offsetWidth) || 0,
                    height: (ref && ref.current.offsetHeight) || 0,
                };
            }
            return {
                width: (root && root.clientWidth) || 0,
                height: (root && root.clientHeight) || 0,
            };
        };

        const handleResize = () => {
            setDimensions(getDimensions());
        };

        setDimensions(getDimensions());

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ref]);

    return dimensions;
}

export default useSize;
