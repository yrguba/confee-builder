import React from 'react';

import { appService } from 'entities/app';
import { useFetchMediaContent, useFs } from 'shared/hooks';

import Icons from './icons';
import styles from './styles.module.scss';
import Notification from '../../../notification';
import { DocumentProps } from '../types';

function Document(props: DocumentProps) {
    const { url, size, name } = props;
    const notification = Notification.use();
    const { src, fileBlob } = useFetchMediaContent(url);
    const { saveFile } = useFs();

    const clickDocument = () => {
        if (appService.tauriIsRunning && fileBlob) {
            saveFile({ fileName: url, fileBlob, folderDir: '', baseDir: 'Download' }).then(() => {
                notification.success({ title: 'Файл сохранен в папку загрузки' });
            });
        }
    };

    return (
        <a
            className={styles.wrapper}
            onClick={clickDocument}
            href={appService.tauriIsRunning ? '#' : src}
            download={!appService.tauriIsRunning}
            rel="noreferrer"
        >
            <div className={styles.icon}>
                <Icons variant="doc" />
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{name}</div>
            </div>
        </a>
    );
}

export default Document;
