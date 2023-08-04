import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    useDebounce,
    useClickAway,
    useScrolling,
    usePrevious,
    useWindowSize,
    useLocation,
    useEffectOnce,
    useCopyToClipboard,
    useIdle,
    useNetworkState,
    useTimeout,
} from 'react-use';
import useDownloader from 'react-use-downloader';
import useFileUploader from 'react-use-file-uploader';
import { useTimer } from 'use-timer';

import useArray from './useArray';
import useAudioRecorder from './useAudioRecord';
import useCreateSelectors from './useCreateSelectors';
import useEasyState, { UseEasyStateReturnedType } from './useEasyState';
import useFetchMediaContent from './useFetchMediaContent';
import useFileDownloads from './useFileDownloads';
import useReverseTimer from './useReverseTimer';
import useRouter from './useRouter';
import useScroll from './useScroll';
import useSize from './useSize';
import useStorage from './useStorage';
import useStyles from './useStyles';
import useTheme from './useTheme';
import useToggle from './useToggle';
import useWebSocket from './useWebSocket';
import useWebView from './useWebView';
import ConfigMediaQuery from '../configs/media-query';

const { useWidthMediaQuery, useHeightMediaQuery } = ConfigMediaQuery;
export {
    useStorage,
    useEasyState,
    useWebView,
    useFetchMediaContent,
    useTimeout,
    useRouter,
    useWidthMediaQuery,
    useHeightMediaQuery,
    useDownloader,
    useFileDownloads,
    useNetworkState,
    useIdle,
    useTimer,
    useTheme,
    useCreateSelectors,
    useDebounce,
    useToggle,
    useClickAway,
    useStyles,
    useScrolling,
    useSize,
    useArray,
    usePrevious,
    useWindowSize,
    useScroll,
    useReverseTimer,
    useInView,
    useAnimation,
    useLocation,
    useEffectOnce,
    useCopyToClipboard,
    useFileUploader,
    useAudioRecorder,
    useWebSocket,
};

export type { UseEasyStateReturnedType };
