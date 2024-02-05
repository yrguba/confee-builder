import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

function waveformStatic({ url }: { url: string }) {
    const containerRef: any = useRef();
    const waveSurferRef: any = useRef({
        isPlaying: () => false,
    });

    const [isLoading, toggleIsLoading] = useState(false);
    const [isPlaying, toggleIsPlaying] = useState(false);
    type InitialTime = { currentSec?: string; h: string; m: string; s: string };
    const initTime = { currentSec: '0', h: '0', m: '0', s: '0' };

    const [time, setTime] = useState<InitialTime>(initTime);
    const [currentTime, setCurrentTime] = useState<InitialTime>(initTime);

    const timeConvert = (sec: number) => {
        const h = Math.round(sec / 3600);
        const m = Math.round(sec / 60);
        const checkS = sec - (h * 3600 + m * 60);
        const s = checkS < 0 ? -checkS : checkS;

        return { h: h ? String(h) : '', m: String(String(m < 10 ? `0${m}` : m)), s: String(s < 10 ? `0${s}` : s) };
    };

    useEffect(() => {
        toggleIsLoading(true);
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
            toggleIsLoading(false);
            waveSurferRef.current = waveSurfer;
            setTime(timeConvert(Math.ceil(waveSurfer.getDuration())));
            waveSurfer.on('play', () => {
                toggleIsPlaying(true);
                waveSurferRef.current = waveSurfer;
            });

            waveSurfer.on('stop', () => {
                toggleIsPlaying(false);

                setCurrentTime(timeConvert(Math.ceil(waveSurfer.getCurrentTime())));
            });

            waveSurfer.on('pause', () => {
                toggleIsPlaying(false);
                setCurrentTime(timeConvert(Math.ceil(waveSurfer.getCurrentTime())));
            });
            waveSurfer.on('audioprocess', (currentTime) => {
                setTime((prev) => ({ ...prev, currentSec: currentTime }));
                setCurrentTime(timeConvert(Math.ceil(currentTime)));
            });
            waveSurfer.on('finish', () => {
                setTime((prev) => ({ ...prev, currentSec: '' }));
                waveSurferRef.current.stop();
            });
            waveSurfer.on('interaction', (data) => {});
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [url]);

    const waveform = <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} />;

    return [waveform, waveSurferRef, isPlaying, time, currentTime, isLoading];
}

export default waveformStatic;
