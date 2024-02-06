import React, { RefObject, useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import styles from './styles.module.scss';
import { useEasyState, useFs, useAudio, useFetchMediaContent, useGlobalAudioPlayer } from '../../../../../hooks';
import { sizeConverter, timeConverter } from '../../../../../lib';
import momentLocalZone from '../../../../../lib/moment-local-zone';
import Icons from '../../../../icons';
import { Box, ContextMenu, ContextMenuTypes } from '../../../../index';
import Notification from '../../../../notification';
import Title from '../../../../title';
import useAudioStore from '../../store';
import { PlayerProps } from '../../types';

function Player(props: any) {
    // const {} = props;

    const currentlyPlaying = useAudioStore.use.currentlyPlaying();

    const { load, play, pause, playing, isReady, src: playerSrc, togglePlayPause } = useGlobalAudioPlayer();

    const click = () => {
        togglePlayPause();
        // controls.value.togglePlayPause();
    };

    return (
        <Box.Animated visible={!!currentlyPlaying.value.src} className={styles.wrapper} onClick={click}>
            <div className={styles.container}>
                <div className={styles.left}>left</div>
                <div className={styles.right}>right</div>
            </div>
        </Box.Animated>
    );
}

export default Player;
