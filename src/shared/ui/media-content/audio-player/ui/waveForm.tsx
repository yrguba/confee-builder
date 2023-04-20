import React, { useRef, useEffect } from 'react';

function animateBars(analyser: any, canvas: any, canvasCtx: any, dataArray: any, bufferLength: any) {
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = '#000';

    const HEIGHT = canvas.height / 2;

    const barWidth = Math.ceil(canvas.width / bufferLength) * 2.5;
    let barHeight: any;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * HEIGHT;
        const blueShade = Math.floor((dataArray[i] / 255) * 5); // generate a shade of blue based on the audio input
        const blueHex = ['#61dafb', '#5ac8fa', '#50b6f5', '#419de6', '#20232a'][blueShade]; // use react logo blue shades
        canvasCtx.fillStyle = blueHex;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

function WaveForm({ analyzerData }: any) {
    if (!analyzerData) return null;
    const width = 500;
    const height = 500;
    const canvasRef = useRef(null);
    const { dataArray, analyzer, bufferLength } = analyzerData;

    const draw = (dataArray: any, analyzer: any, bufferLength: any) => {
        const canvas: any = canvasRef.current;
        if (!canvas || !analyzer) return;
        const canvasCtx = canvas.getContext('2d');

        const animate = () => {
            requestAnimationFrame(animate);
            // eslint-disable-next-line no-self-assign
            canvas.width = canvas.width;
            canvasCtx.translate(0, canvas.offsetHeight / 2 - 115);
            animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength);
        };

        animate();
    };

    useEffect(() => {
        draw(dataArray, analyzer, bufferLength);
    }, [dataArray, analyzer, bufferLength]);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <canvas
            style={{
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '10',
            }}
            ref={canvasRef}
            width={width}
            height={height}
        />
    );
}

export default WaveForm;
