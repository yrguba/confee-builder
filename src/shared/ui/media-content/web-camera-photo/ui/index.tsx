import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

import { useWidthMediaQuery, useHeightMediaQuery } from 'shared/hooks';

import styles from './styles.module.scss';
import Button from '../../../button';
import { Modal } from '../../../index';
import Image from '../../image';
import { WebCameraProps } from '../types';

function WebCameraPhoto(props: WebCameraProps) {
    const { getScreenshot } = props;
    const webcamRef = React.useRef<any>(null);

    const [photoPreview, setPhotoPreview] = useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPhotoPreview(imageSrc);
    }, [webcamRef]);

    const videoConstraints = {
        width: useWidthMediaQuery().to('sm') ? 400 : 480,
        height: useHeightMediaQuery().to('sm') ? 400 : 480,
        facingMode: 'user',
        'border-radius': '8px',
    };
    const modal = Modal.use('web-camera');

    useEffect(() => {
        modal.open();
    }, []);

    return (
        <Modal {...modal}>
            <div className={styles.wrapper}>
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
                            <Button size="s" width="50%" variant="primary" onClick={() => setPhotoPreview(null)}>
                                Сделать ещё раз
                            </Button>
                            <Button size="s" width="50%" onClick={() => getScreenshot(photoPreview)}>
                                Установить снимок
                            </Button>
                        </div>
                    ) : (
                        <Button variant="primary" size="s" onClick={capture}>
                            Сделать снимок
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default WebCameraPhoto;
