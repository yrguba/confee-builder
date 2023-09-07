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
    speechListener: (value: boolean) => void;
    send: () => void;
} & BaseTypes.Statuses;

function SpeechButton(props: Props) {
    const { onClick: click, speechListener, getText, send } = props;

    const { startSpeechToText, stopSpeechToText, interimResult } = useRecognizeSpeech();

    const startListener = useEasyState(false);

    const longPressEvent = useLongPress(() => startListener.set(true), {
        isPreventDefault: true,
        delay: 400,
    });

    const onClick = (e: any) => {
        e.stopPropagation();
        if (!startListener.value) {
            click && click();
        }
    };

    const sendClick = (e: any) => {
        e.stopPropagation();
        if (startListener.value) {
            send();
            startListener.set(false);
        }
    };

    useUpdateEffect(() => {
        startListener.value ? startSpeechToText() : stopSpeechToText();
        speechListener(startListener.value);
    }, [startListener.value]);

    useUpdateEffect(() => {
        interimResult && getText(interimResult);
    }, [interimResult]);

    return (
        <div className={styles.wrapper}>
            <Box.Animated key={String(startListener.value)} visible={startListener.value} className={styles.menu}>
                <div className={styles.audioControl}>
                    <div className={styles.delete} onClick={() => startListener.set(false)}>
                        <Icons variant="close" />
                    </div>
                </div>
            </Box.Animated>
            <Box.Animated {...longPressEvent} visible className={styles.microIcon} onClick={startListener.value ? sendClick : onClick}>
                <Icons variant={startListener.value ? 'send' : 'keyboard'} />
            </Box.Animated>
        </div>
    );
}

export default SpeechButton;
