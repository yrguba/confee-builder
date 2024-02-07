import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { useEasyState } from '../../../../../hooks';
import { timeConverter } from '../../../../../lib';

type Props = {
    url: string;
    seek: (value: number) => void;
    enableSeek: boolean;
};

function waveformStatic({ url, seek, enableSeek }: Props) {
    const containerRef: any = useRef();
    const duration = useEasyState('');
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
            duration.set(timeConverter(waveSurfer.getDuration()));
            waveSurfer.on('interaction', () => {
                setTimeout(() => {
                    const curTime = waveSurfer.getCurrentTime();
                    if (curTime > 0) {
                        seek(curTime);
                    }
                }, 100);
            });
            waveSurfer.on('finish', () => {
                waveSurfer.stop();
            });
            waveSurfer.setVolume(0);
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [url]);

    return { waveDuration: duration.value, surf: surf.value, containerRef };
}

export default waveformStatic;
