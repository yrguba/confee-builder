import React from 'react';

import { useAppStore, appService } from 'entities/app';
import { useDownloader } from 'shared/hooks';

import Icons from './icons';
import styles from './styles.module.scss';
import { DocumentProps } from '../types';

function Document(props: DocumentProps) {
    const { url, size, name } = props;

    // const { save } = useFileDownloads();

    // const { tauriIsRunning } = appService;
    //
    // const { elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();
    //
    // const click = async () => {
    //     if (tauriIsRunning) {
    //         await save(url, name);
    //     } else {
    //         await download(url, name);
    //     }
    // };

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                <Icons variant="doc" />
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
            </div>
        </div>
    );
}

export default Document;
