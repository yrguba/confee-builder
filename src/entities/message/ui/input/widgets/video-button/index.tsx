import React, { MouseEvent, useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, useStyles, useTimeoutFn, useLongPress } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons } from 'shared/ui';

import styles from './styles.module.scss';

type Recording = 'start' | 'send' | 'stop' | 'cancel';

type Props = {
    onClick?: () => void;
} & BaseTypes.Statuses;

function VideoButton(props: Props) {
    const { onClick: click } = props;

    const visibleCamera = useEasyState(false);

    const longPressEvent = useLongPress(() => visibleCamera.set(true), {
        isPreventDefault: true,
        delay: 400,
    });

    const onClick = (e: any) => {
        e.stopPropagation();
        !visibleCamera.value && click && click();
    };

    return (
        <div className={styles.wrapper}>
            <Box.Animated {...longPressEvent} visible className={styles.microIcon} onClick={onClick}>
                <Icons variant="videocam-outlined" />
            </Box.Animated>
        </div>
    );
}

export default VideoButton;
