import React, { useState } from 'react';
import Webcam from 'react-webcam';

import { useSize, useMedia } from 'shared/hooks';

import styles from './styles.module.scss';
import Button from '../../../button';
import Image from '../../image';
import { WebCameraProps } from '../types';

function WebCamera(props: WebCameraProps) {
    const { getScreenshot } = props;
    const webcamRef = React.useRef<any>(null);
    const { breakpoint } = useMedia();
    const [photoPreview, setPhotoPreview] = useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhotoPreview(imageSrc);
    }, [webcamRef]);

    const videoConstraints = {
        width: breakpoint === 'sm' ? 400 : 480,
        height: breakpoint === 'sm' ? 400 : 480,
        facingMode: 'user',
        'border-radius': '8px',
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.camera}>
                    <div className={styles.border} />
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={videoConstraints} />
                    {photoPreview && (
                        <div className={styles.cover}>
                            <Image img={photoPreview} />
                        </div>
                    )}
                </div>
                <div className={styles.panel}>
                    {photoPreview ? (
                        <div className={styles.btns}>
                            <Button size="xl" primary={false} onClick={() => setPhotoPreview(null)}>
                                Сделать ещё раз
                            </Button>
                            <Button size="xl" onClick={() => getScreenshot(photoPreview)}>
                                Установить снимок
                            </Button>
                        </div>
                    ) : (
                        <Button primary size="xl" onClick={capture}>
                            Сделать снимок
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default WebCamera;
