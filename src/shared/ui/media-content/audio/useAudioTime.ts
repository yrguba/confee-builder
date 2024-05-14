import { useEffect, useRef } from 'react';

import { useEasyState, useGlobalAudioPlayer, useThrottle } from '../../../hooks';
import { timeConverter } from '../../../lib';

const [throttle] = useThrottle((cl) => cl(), 1000);

export default function useAudioTime(enabled: boolean) {
    const frameRef = useRef<number>();
    const currentTime = useEasyState('');
    const currentSec = useEasyState(0);
    const { getPosition, duration, playing } = useGlobalAudioPlayer();

    useEffect(() => {
        if (playing) {
            const animate = () => {
                const pos = Math.ceil(getPosition());
                currentTime.set(timeConverter(pos));
                currentSec.set(pos);
                frameRef.current = requestAnimationFrame(animate);
                throttle(() => {});
            };

            frameRef.current = window.requestAnimationFrame(animate);

            return () => {
                if (frameRef.current) {
                    cancelAnimationFrame(frameRef.current);
                }
            };
        }
    }, [getPosition(), playing]);

    return { currentTime: currentTime.value, currentSec: currentSec.value, duration: timeConverter(duration) };
}
