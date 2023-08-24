import React from 'react';

import { appService } from 'entities/app';
import { useFetchMediaContent, useFs } from 'shared/hooks';

import styles from './styles.module.scss';
import { sizeConverter } from '../../../../../lib';
import Icons from '../../../../icons';
import Notification from '../../../../notification';
import Title from '../../../../title';
import { BaseDocumentProps } from '../../types';

function Document(props: BaseDocumentProps) {
    const { url, size, name, extension } = props;
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
                <Icons.Document variant={extension as any} />
            </div>

            <div className={styles.caption}>
                <Title textAlign="left" variant="H3R">
                    {name}
                </Title>
                {size && <Title variant="H3R">{sizeConverter(+size)}</Title>}
            </div>
        </a>
    );
}

export default Document;
