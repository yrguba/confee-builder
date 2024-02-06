import React, { RefObject, useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import styles from './styles.module.scss';
import { useEasyState, useFs, useAudio, useFetchMediaContent } from '../../../../../hooks';
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

    return <div className={styles.wrapper}>Player</div>;
}

export default Player;
