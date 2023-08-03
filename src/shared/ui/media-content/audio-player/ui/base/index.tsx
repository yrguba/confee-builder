import React, { useRef, useState, useEffect } from 'react';
import { useAudio } from 'react-use';

import styles from './styles.module.scss';
import Button from '../../../../button';
import { BaseAudioPlayerProps } from '../../types';
import Icons from '../icons';
import waveformStatic from '../wave-form/static';

function BaseAudioPlayer(props: BaseAudioPlayerProps) {
    const { url } = props;

    const [waveform, waveSurferControl, isPlaying] = waveformStatic({ url });

    const [audio, state, controls, audioRef]: any = useAudio({
        src: url,
        autoPlay: false,
        onPlay: () => {},
    });
    if (audioRef?.current) {
        audioRef.current.crossOrigin = 'anonymous';
    }

    const playPauseClick = () => {
        if (isPlaying) {
            // controls.pause();
            waveSurferControl?.pause();
        } else {
            // controls.play();
            waveSurferControl?.play();
        }
    };
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

    return (
        <div className={styles.wrapper}>
            {audio}
            <div className={styles.controls}>
                <Button.Circle onClick={playPauseClick}>
                    <Icons variant={isPlaying ? 'pause' : 'play'} />
                </Button.Circle>
            </div>
            <div className={styles.waveform}>{waveform}</div>
        </div>
    );
}

export default BaseAudioPlayer;
