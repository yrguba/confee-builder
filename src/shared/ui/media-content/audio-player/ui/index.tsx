import React, { useRef, useState, useEffect } from 'react';
import { useAudio } from 'react-use';

import styles from './styles.module.scss';
import waveformStatic from './wafeFormStatic';
import { AudioPlayerProps } from '../types';

function AudioPlayer(props: AudioPlayerProps) {
    const { url } = props;

    const [audio, state, controls, audioRef]: any = useAudio({
        src: url,
        autoPlay: false,
        onPlay: () => {
            // audioAnalyzer();
        },
    });
    if (audioRef?.current) {
        audioRef.current.crossOrigin = 'anonymous';
    }
    // const [analyzerData, setAnalyzerData] = useState<any>(null);
    //
    // const audioAnalyzer = () => {
    //     const audioCtx = new window.AudioContext();
    //     const analyzer = audioCtx.createAnalyser();
    //     analyzer.fftSize = 2048;
    //
    //     const bufferLength = analyzer.frequencyBinCount;
    //     const dataArray = new Uint8Array(bufferLength);
    //     const source = audioCtx.createMediaElementSource(audioRef.current);
    //     source.connect(analyzer);
    //     source.connect(audioCtx.destination);
    //     // @ts-ignore
    //     source.onended = () => {
    //         source.disconnect();
    //     };
    //
    //     setAnalyzerData({ analyzer, bufferLength, dataArray });
    // };

    const [el] = waveformStatic({ url });
    return (
        <div onClick={controls.play} className={styles.wrapper}>
            {audio} eff
            {el}
        </div>
    );
}

export default AudioPlayer;
