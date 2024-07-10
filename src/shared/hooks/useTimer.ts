import { useState, useEffect } from 'react';

export default function useTimer(step: number, active = true) {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(active);

    useEffect(() => {
        let interval: any = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + step);
            }, step * 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);
    return seconds;
}
