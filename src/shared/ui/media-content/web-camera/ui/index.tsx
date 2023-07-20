import React from 'react';
import Webcam from 'react-webcam';

import { useAppStore } from 'entities/app';
import { useSize, useFileDownloads, useDownloader } from 'shared/hooks';

import Icons from './icons';
import styles from './styles.module.scss';
import Button from '../../../button';
import { WebCameraProps } from '../types';

function WebCamera(props: WebCameraProps) {
    const { makePhoto } = props;
    const webcamRef = React.useRef<any>(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        makePhoto(imageSrc);
    }, [webcamRef]);

    const { width, height } = useSize();

    const videoConstraints = {
        width: 480,
        height: 300,
        facingMode: 'user',
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.camera}>
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
            </div>
            <div className={styles.panel}>
                <Button onClick={capture}>Capture photo</Button>
            </div>
        </div>
    );
}

export default WebCamera;
