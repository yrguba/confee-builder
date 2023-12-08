import { useEffect, useState } from 'react';

export function useWindowMouseClick() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleWindowMouseMove = (event: any) => {
            setCoords({
                x: event.clientX,
                y: event.clientY,
            });
        };
        window.addEventListener('contextmenu', handleWindowMouseMove);

        return () => {
            window.removeEventListener('contextmenu', handleWindowMouseMove);
        };
    }, []);

    return coords;
}
