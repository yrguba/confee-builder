import React, { MouseEvent, useEffect, useRef } from 'react';

import { useEasyState, useStyles, useTimeoutFn } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Emoji, Box, Icons, Title, Button } from 'shared/ui';

import styles from './styles.module.scss';

type Recording = 'start' | 'send';

type Props = {
    event: (value: Recording) => void;
} & BaseTypes.Statuses;

function VoiceButton(props: Props) {
    const { event } = props;

    const once = useRef(true);
    const lock = useEasyState(false);
    const eventCurrent = useEasyState<Recording | null>(null);
    const mouseY = useEasyState<number>(0);

    const breakpoint = 80;

    const [isReady, cancel, reset] = useTimeoutFn(() => {
        !once.current && eventCurrent.set('start');
    }, 400);

    const readyState = isReady();
    const isStart = eventCurrent.value === 'start';

    const onMouseDown = () => {
        once.current = false;
        reset();
    };

    const onMouseUpMicrophone = () => {
        if (readyState) {
            eventCurrent.set('send');
        }
    };

    const onMouseUpLock = () => {
        if (readyState) {
            if (mouseY.value > breakpoint) {
                lock.set(true);
            } else {
                eventCurrent.set(null);
            }
        }
    };

    const onClick = () => {
        cancel();
    };

    const onMouseMoveLock = (e: any) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        const mousePositionsY = e.clientY - rect.top;
        const mousePositionsYReverse = -(mousePositionsY - e.target.clientHeight);
        mouseY.set(mousePositionsYReverse);
    };

    useEffect(() => {
        if (eventCurrent.value) event(eventCurrent.value);
    }, [eventCurrent.value]);

    const classes = useStyles(styles, 'wrapper', {
        startRecording: isStart,
    });

    return (
        <div className={classes}>
            <Box.Animated key={String(lock.value)} visible={eventCurrent.value === 'start'} className={styles.menu}>
                {lock.value ? (
                    <div onMouseUp={onMouseUpLock}>
                        <Icons.Player variant="stop" />
                    </div>
                ) : (
                    <div className={styles.lock} onMouseMove={onMouseMoveLock} onMouseUp={onMouseUpLock}>
                        <div className={styles.icon} style={{ transform: `scale(${mouseY.value > breakpoint ? 2 : 1})` }}>
                            <SvgLock breakpoint={breakpoint} mouseY={mouseY.value} />
                        </div>
                    </div>
                )}
            </Box.Animated>
            <Button.Circle radius={30} variant="secondary" onMouseDown={onMouseDown} onMouseUp={onMouseUpMicrophone} onClick={onClick}>
                <Icons variant="microphone" />
            </Button.Circle>
        </div>
    );
}
function SvgLock({ mouseY, breakpoint }: { mouseY: number; breakpoint: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24">
            <defs>
                <linearGradient id="lgrad" x1="50%" x2="50%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--text-action)" />
                    <stop offset={`${mouseY}%`} stopColor="var(--text-primary)" />
                </linearGradient>
            </defs>
            <path
                style={{}}
                className={`${styles.path} ${mouseY > breakpoint ? styles.path_active : ''}`}
                fill={mouseY > breakpoint ? 'var(--text-action)' : 'url(#lgrad)'}
                d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm4 10.723V20h-2v-2.277a1.993 1.993 0 01.567-3.677A2.001 2.001 0 0114 16a1.99 1.99 0 01-1 1.723z"
            />
        </svg>
    );
}

export default VoiceButton;
