import React from 'react';

import styles from './styles.module.scss';
import { Icons } from '../../../../shared/ui';

type Props = {
    closeClick: () => void;
};

function PhotoVideoSwiperView(props: Props) {
    const { closeClick } = props;

    return (
        <div data-tauri-drag-region className={styles.wrapper}>
            <div className={styles.closeIcon} onClick={closeClick}>
                <Icons variant="close" />
            </div>
            awdawdd
        </div>
    );
}

export default PhotoVideoSwiperView;
