import { useState, useEffect } from 'react';

function useReverseTimer({ hours = 0, minutes = 0, seconds = 0 }) {
    const [paused, setPaused] = useState(false);
    const [starting, setStarting] = useState(false);
    const [over, setOver] = useState(false);
    const [[h, m, s], setTime] = useState([hours, minutes, seconds]);

    const tick = () => {
        if (paused || over || !starting) return;

        if (h === 0 && m === 0 && s === 0) {
            setOver(true);
            setStarting(false);
        } else if (m === 0 && s === 0) {
            setTime([h - 1, 59, 59]);
        } else if (s === 0) {
            setTime([h, m - 1, 59]);
        } else {
            setTime([h, m, s - 1]);
        }
    };

    const reset = () => {
        if (paused || starting) {
            setTime([hours, minutes, seconds]);
            setPaused(false);
            setOver(false);
        }
    };

    const start = () => {
        if (!starting) {
            setTime([hours, minutes, seconds]);
            setPaused(false);
            setPaused(false);
            setOver(false);
            setStarting(true);
        }
    };

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    });

    return { isRunning: starting, reset, start, time: [h, m, s] };
}

export default useReverseTimer;
