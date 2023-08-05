import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDimensionsObserver, useElementDimensions, useWindowDimensions } from 'react-screen-hooks';
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

import useArray from './useArray';
import useAudioRecorder from './useAudioRecord';
import useCreateSelectors from './useCreateSelectors';
import useEasyState, { UseEasyStateReturnedType } from './useEasyState';
import useFetchMediaContent from './useFetchMediaContent';
import useFileDownloads from './useFileDownloads';
import useReverseTimer from './useReverseTimer';
import useRouter from './useRouter';
import useScroll from './useScroll';
import useSip from './useSip';
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
    useDimensionsObserver,
    useElementDimensions,
    useWindowDimensions,
    useSip,
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
