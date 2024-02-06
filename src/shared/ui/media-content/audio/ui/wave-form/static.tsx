import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { useEasyState } from '../../../../../hooks';

type Props = {
    url: string;
    seek: (value: number) => void;
};

function waveformStatic({ url, seek }: Props) {
    const containerRef: any = useRef();
    const duration = useEasyState<number>(0);
    const surf = useEasyState<any>(null);
    const surfRef = useRef<any>(null);

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            // responsive: true,
            barWidth: 2,
            // barHeight: 60,
            // closeAudioContext: false,
            barMinHeight: 2,
            cursorWidth: 0,
            removeMediaElementOnDestroy: true,
            partialRender: true,
            normalize: true,
            waveColor: '#7B57C8',
            progressColor: 'purple',
            height: 26,
        });
        waveSurfer.load(url);

        waveSurfer.on('ready', () => {
            surf.set(waveSurfer);
            duration.set(waveSurfer.getDuration());
            waveSurfer.on('interaction', () => {
                seek(waveSurfer.getCurrentTime());
            });
            //
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [url]);

    const waveform = <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;

    return { waveform, waveDuration: duration.value, surf: surf.value };
}

export default waveformStatic;
