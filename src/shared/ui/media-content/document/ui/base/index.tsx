import React, { useEffect } from 'react';

import { appService } from 'entities/app';
import { useEasyState, useFetchMediaContent, useFs } from 'shared/hooks';

import styles from './styles.module.scss';
import { messageStore } from '../../../../../../entities/message';
import { sizeConverter } from '../../../../../lib';
import Icons from '../../../../icons';
import { ContextMenu, ContextMenuTypes, Dropdown, DropdownTypes } from '../../../../index';
import LoadingIndicator from '../../../../loading-indicator';
import Notification from '../../../../notification';
import Title from '../../../../title';
import { BaseDocumentProps } from '../../types';

function Document(props: BaseDocumentProps) {
    const { id, disableDownload = true, url, size, name, extension } = props;
    const visibleMenu = useEasyState(false);

    const downloadFile = messageStore.use.downloadFile();

    const notification = Notification.use();

    const fs = useFs();

    const progress = useEasyState(0);

    const saveFile = () => {
        if (name && url) {
            fs.downLoadAndSave({ baseDir: 'download', url, fileName: name, progressCallback: (percent) => progress.set(percent) });
        }
    };

    const clickContextMenu = async (e: any) => {
        e.preventDefault();
        if (!disableDownload) {
            visibleMenu.toggle();
        } else {
            downloadFile.set({
                fileType: 'documents',
                callback: saveFile,
            });
        }
    };

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: 'Скачать файл',
            icon: <Icons variant="save" />,
            callback: async () => {
                visibleMenu.set(false);
                saveFile();
            },
        },
    ];

    useEffect(() => {
        if (progress.value === 100) {
            notification.success({ title: 'Файл сохранен', system: true });
        }
    }, [progress.value]);

    return (
        <div onMouseLeave={() => visibleMenu.set(false)} onContextMenu={clickContextMenu} className={styles.wrapper}>
            <div className={styles.icon}>
                {!url ? (
                    <Icons variant="block" />
                ) : progress.value > 0 && progress.value < 100 ? (
                    <LoadingIndicator.Downloaded primary={false} visible />
                ) : (
                    <Icons.Document variant={extension as any} />
                )}
            </div>

            {(size || name || extension) && (
                <div className={styles.caption}>
                    <Title textAlign="left" variant="H3R">
                        {name}
                    </Title>
                    {size && <Title variant="H3R">{sizeConverter(+size)}</Title>}
                </div>
            )}
            <ContextMenu visible={visibleMenu.value} items={menuItems} />
        </div>
    );
}

export default Document;
