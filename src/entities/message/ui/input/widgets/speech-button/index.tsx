import React, { MouseEvent, useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, useStyles, useRecognizeSpeech, useLongPress } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons } from 'shared/ui';

import styles from './styles.module.scss';

type Recording = 'start' | 'send' | 'stop' | 'cancel';

type Props = {
    getText: (text: string) => void;
    onClick?: () => void;
} & BaseTypes.Statuses;

function SpeechButton(props: Props) {
    const { onClick: click } = props;

    const { startSpeechToText, stopSpeechToText, interimResult } = useRecognizeSpeech();

    const startListener = useEasyState(false);

    const longPressEvent = useLongPress(() => startListener.set(true), {
        isPreventDefault: true,
        delay: 400,
    });

    const onClick = (e: any) => {
        e.stopPropagation();
        !startListener.value && click && click();
    };

    useUpdateEffect(() => {
        startListener ? startSpeechToText() : stopSpeechToText();
    }, [startListener.value]);

    return (
        <div className={styles.wrapper}>
            <Box.Animated key={String(startListener.value)} visible={startListener.value} className={styles.menu}>
                <div className={styles.audioControl}>
                    <div className={styles.delete} onClick={() => startListener.set(false)}>
                        <Icons variant="delete" />
                    </div>
                </div>
            </Box.Animated>
            <Box.Animated {...longPressEvent} visible className={styles.microIcon} onClick={onClick}>
                <Icons variant="keyboard" />
            </Box.Animated>
        </div>
    );
}

export default SpeechButton;
