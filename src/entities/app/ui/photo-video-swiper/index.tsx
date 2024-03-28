import React from 'react';

import styles from './styles.module.scss';
import { Icons } from '../../../../shared/ui';

type Props = {
    close: () => void;
};

function PhotoVideoSwiperView(props: Props) {
    const { close } = props;

    return (
        <div data-tauri-drag-region className={styles.wrapper}>
            <div className={styles.closeIcon} onClick={close}>
                <Icons variant="close" />
            </div>
            awdawdd
        </div>
    );
}

export default PhotoVideoSwiperView;
