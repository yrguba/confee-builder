import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

function waveformStatic({ url }: { url: string }) {
    const containerRef: any = useRef();
    const waveSurferRef: any = useRef({
        isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState(false);

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            responsive: true,
            barWidth: 2,
            barHeight: 10,
            cursorWidth: 0,
        });
        waveSurfer.load(url);
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer;
        });

        return () => {
            waveSurfer.destroy();
        };
    }, [url]);

    const el = (
        <div>
            <button
                onClick={() => {
                    waveSurferRef.current.playPause();
                    toggleIsPlaying(waveSurferRef.current.isPlaying());
                }}
                type="button"
            >
                f
            </button>
            <div style={{ width: 300 }} ref={containerRef} />
        </div>
    );

    return [el];
    // return (
    //     <div>
    //         <button
    //             onClick={() => {
    //                 waveSurferRef.current.playPause();
    //                 toggleIsPlaying(waveSurferRef.current.isPlaying());
    //             }}
    //             type="button"
    //         >
    //             f
    //         </button>
    //         <div ref={containerRef} />
    //     </div>
    // );
}

export default waveformStatic;
