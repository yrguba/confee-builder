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
    useRendersCount,
    useVideo,
} from 'react-use';
import useDownloader from 'react-use-downloader';
import useFileUploader, { Types as UseFileUploaderTypes } from 'react-use-file-uploader';

import useArray from './useArray';
import useAudioRecorder from './useAudioRecord';
import useCallbackRef from './useCallbackRef';
import useCreateSelectors from './useCreateSelectors';
import useEasyState, { UseEasyStateReturnedType } from './useEasyState';
import useFetchMediaContent from './useFetchMediaContent';
import useFs from './useFS';
import useReverseTimer from './useReverseTimer';
import useRouter from './useRouter';
import useScroll from './useScroll';
import useSip from './useSip';
import useSize from './useSize';
import useStorage from './useStorage';
import useStore from './useStore';
import useStyles from './useStyles';
import useTheme from './useTheme';
import useToggle from './useToggle';
import useWebSocket from './useWebSocket';
import useWebView from './useWebView';
import mediaQuery from '../configs/media-query';

const { useWidthMediaQuery, useHeightMediaQuery } = mediaQuery;
export {
    useVideo,
    useCallbackRef,
    useRendersCount,
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
    useFs,
    useNetworkState,
    useIdle,
    useStore,
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

export type { UseEasyStateReturnedType, UseFileUploaderTypes };
