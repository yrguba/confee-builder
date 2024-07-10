import { useEffect, useState } from 'react';

export function useWindowMouseClick(event?: 'contextmenu' | 'click' | 'mousedown' | 'mouseup', disabled?: boolean) {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    useEffect(() => {
        if (!disabled) {
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
        }
    }, [disabled]);

    return coords;
}
