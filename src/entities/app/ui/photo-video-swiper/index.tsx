import React from 'react';

import styles from './styles.module.scss';
import { Button, Icons } from '../../../../shared/ui';

type Props = {
    minimize: () => void;
    toggleFullScreen: () => void;
    close: () => void;
    isFullScreen: boolean;
};

function PhotoVideoSwiperView(props: Props) {
    const { minimize, toggleFullScreen, close, isFullScreen } = props;

    return (
        <div data-tauri-drag-region className={styles.wrapper}>
            <div data-tauri-drag-region className={styles.header}>
                <Button.Circle variant="inherit" onClick={minimize}>
                    <Icons variant="minimize" />
                </Button.Circle>
                <Button.Circle variant="inherit" onClick={toggleFullScreen}>
                    <Icons variant={isFullScreen ? 'not-full-screen' : 'full-screen'} />
                </Button.Circle>
                <Button.Circle variant="inherit" onClick={close}>
                    <Icons variant="close" />
                </Button.Circle>
            </div>
            awdawdd
        </div>
    );
}

export default PhotoVideoSwiperView;
