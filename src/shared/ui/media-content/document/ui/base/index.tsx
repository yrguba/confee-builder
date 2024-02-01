import React from 'react';

import { appService } from 'entities/app';
import { useEasyState, useFetchMediaContent, useFs } from 'shared/hooks';

import styles from './styles.module.scss';
import { useChatStore } from '../../../../../../entities/chat';
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

    const { src, getFileBlob } = useFetchMediaContent({ url, name, fileType: 'document' });
    const notification = Notification.use();

    const { saveFromBack } = useFs();

    const clickContextMenu = async (e: any) => {
        e.preventDefault();

        // if (clickedFile && name && id) {
        //     const blob = await getFileBlob();
        //     clickedFile.set({ url: src, name, id, type: 'documents' });
        // }
        if (!disableDownload) {
            visibleMenu.toggle();
        }
    };

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: 'Скачать файл',
            icon: <Icons variant="save" />,
            callback: async () => {
                if (name && url) {
                    await saveFromBack({ baseDir: 'download', url, fileName: name });
                    notification.success({ title: 'Файл сохранен', system: true });
                }
            },
        },
    ];

    return (
        <div onMouseLeave={() => visibleMenu.set(false)} onContextMenu={clickContextMenu} className={styles.wrapper}>
            <div className={styles.icon}>
                {/* {!url ? ( */}
                {/*    <Icons variant="block" /> */}
                {/* ) : idOfSavedFile.value === id ? ( */}
                {/*    <LoadingIndicator.Downloaded primary={false} visible /> */}
                {/* ) : ( */}
                {/*    <Icons.Document variant={extension as any} /> */}
                {/* )} */}
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
