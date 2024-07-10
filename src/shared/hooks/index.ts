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
    useAudio,
    useMountedState,
    useMount,
    useLongPress,
    useUnmount,
} from 'react-use';
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import useDownloader from 'react-use-downloader';
import useFileUploader, * as UseFileUploaderTypes from 'react-use-file-uploader';
import useZustand, * as UseZustandTypes from 'react-use-zustand';

import useArray, { UseArrayReturnType } from './useArray';
import useAudioRecorder from './useAudioRecord';
import useCallbackRef from './useCallbackRef';
import useCreateSelectors from './useCreateSelectors';
import useEasyState, { UseEasyStateReturnType } from './useEasyState';
import useFetchMediaContent from './useFetchMediaContent';
import useFs, * as UseFsTypes from './useFS';
import usePersister from './usePersister';
import useRecognizeSpeech from './useRecognizeSpeech';
import useReverseTimer from './useReverseTimer';
import useRingtone from './useRingtone';
import useRouter from './useRouter';
import useRustServer from './useRustServer';
import useScroll from './useScroll';
import useShell from './useShell';
import useSize from './useSize';
import useStorage, * as UseStorageTypes from './useStorage';
import useStyles from './useStyles';
import useTextToSpeech from './useTextToSpeech';
import useTheme, * as UseThemeType from './useTheme';
import useThrottle from './useThrottle';
import useTimer from './useTimer';
import useToggle from './useToggle';
import useWebSocket from './useWebSocket';
import { useWindowMouseClick } from './useWindowMouseClick';
import useYup from './useYup';
import mediaQuery from '../configs/media-query';

const { useWidthMediaQuery, useHeightMediaQuery } = mediaQuery;
export {
    useZustand,
    usePersister,
    useRustServer,
    useGlobalAudioPlayer,
    useTimer,
    useRingtone,
    useShell,
    useWindowMouseClick,
    useUnmount,
    useLongPress,
    useTextToSpeech,
    useMount,
    useRecognizeSpeech,
    useMountedState,
    useAudio,
    useHoverDirty,
    createMemo,
    useThrottle,
    useUpdateEffect,
    useLifecycles,
    useTimeoutFn,
    useYup,
    useVideo,
    useCallbackRef,
    useRendersCount,
    useDimensionsObserver,
    useElementDimensions,
    useWindowDimensions,
    useStorage,
    useEasyState,
    useFetchMediaContent,
    useTimeout,
    useRouter,
    useWidthMediaQuery,
    useHeightMediaQuery,
    useDownloader,
    useFs,
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

export type { UseFsTypes, UseZustandTypes, UseArrayReturnType, UseThemeType, UseFileUploaderTypes, UseEasyStateReturnType, UseStorageTypes };
