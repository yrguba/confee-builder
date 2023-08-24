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
    useTimeoutFn,
    useLifecycles,
    useUpdateEffect,
    createMemo,
    useHoverDirty,
} from 'react-use';
import useDownloader from 'react-use-downloader';
import { useDraggable as useDraggableScroll } from 'react-use-draggable-scroll';
import useFileUploader, * as UseFileUploaderTypes from 'react-use-file-uploader';

import useArray, { UseArrayReturnType } from './useArray';
import useAudioRecorder from './useAudioRecord';
import useCallbackRef from './useCallbackRef';
import useCreateSelectors from './useCreateSelectors';
import useEasyState, { UseEasyStateReturnType } from './useEasyState';
import useFetchMediaContent from './useFetchMediaContent';
import useFs from './useFS';
import useReverseTimer from './useReverseTimer';
import useRouter from './useRouter';
import useScroll from './useScroll';
import useSip from './useSip';
import useSize from './useSize';
import useStorage from './useStorage';
import useStore, * as UseStoreTypes from './useStore';
import useStyles from './useStyles';
import useTheme from './useTheme';
import useThrottle from './useThrottle';
import useToggle from './useToggle';
import useWebSocket from './useWebSocket';
import useWebView from './useWebView';
import useYup from './useYup';
import mediaQuery from '../configs/media-query';

const { useWidthMediaQuery, useHeightMediaQuery } = mediaQuery;
export {
    useHoverDirty,
    createMemo,
    useThrottle,
    useUpdateEffect,
    useDraggableScroll,
    useLifecycles,
    useTimeoutFn,
    useYup,
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

export type { UseArrayReturnType, UseFileUploaderTypes, UseEasyStateReturnType, UseStoreTypes };
