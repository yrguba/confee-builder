import { useEffect, useState } from 'react';

export function useWindowMouseClick(event?: 'contextmenu' | 'click') {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleWindowMouseMove = (event: any) => {
            setCoords({
                x: event.clientX,
                y: event.clientY,
            });
        };
        window.addEventListener(event || 'contextmenu', handleWindowMouseMove);

        return () => {
            window.removeEventListener(event || 'contextmenu', handleWindowMouseMove);
        };
    }, []);

    return coords;
}
