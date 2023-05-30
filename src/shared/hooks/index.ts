import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    useDebounce,
    useClickAway,
    useScrolling,
    usePrevious,
    useWindowSize,
    useScroll,
    useLocation,
    useEffectOnce,
    useCopyToClipboard,
    useIdle,
    useNetworkState,
} from 'react-use';
import useFileUploader from 'react-use-file-uploader';
import { useTimer } from 'use-timer';

import useArray from './useArray';
import useAudioRecorder from './useAudioRecord';
import useCreateSelectors from './useCreateSelectors';
import useCrypto from './useCrypto';
import useDate from './useDate';
import useEnding from './useEnding';
import useGrid from './useGrid';
import useInput from './useInput';
import useMedia from './useMedia';
import useReverseTimer from './useReverseTimer';
import useRowAndDropdown from './useRowAndDropdown';
import useScrollTo from './useScroll';
import useSize from './useSize';
import useStyles from './useStyles';
import useTheme from './useTheme';
import useToggle from './useToggle';
import ConfigMediaQuery from '../configs/media-query';

const { useWidthMediaQuery, useHeightMediaQuery } = ConfigMediaQuery;
export {
    useWidthMediaQuery,
    useHeightMediaQuery,
    useNetworkState,
    useIdle,
    useTimer,
    useTheme,
    useInput,
    useCreateSelectors,
    useCrypto,
    useDebounce,
    useToggle,
    useClickAway,
    useStyles,
    useScrolling,
    useSize,
    useMedia,
    useRowAndDropdown,
    useArray,
    usePrevious,
    useEnding,
    useWindowSize,
    useGrid,
    useDate,
    useScroll,
    useScrollTo,
    useReverseTimer,
    useInView,
    useAnimation,
    useLocation,
    useEffectOnce,
    useCopyToClipboard,
    useFileUploader,
    useAudioRecorder,
};
