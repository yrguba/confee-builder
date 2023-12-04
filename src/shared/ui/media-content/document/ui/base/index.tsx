import React from 'react';

import { appService } from 'entities/app';
import { useFetchMediaContent, useFs, useSaveMediaContent } from 'shared/hooks';

import styles from './styles.module.scss';
import { sizeConverter } from '../../../../../lib';
import Icons from '../../../../icons';
import { Dropdown, DropdownTypes } from '../../../../index';
import Notification from '../../../../notification';
import Title from '../../../../title';
import { BaseDocumentProps } from '../../types';

function Document(props: BaseDocumentProps) {
    const { clickedFile, disableDownload = true, url, size, name, extension } = props;

    const { src, fileBlob } = useFetchMediaContent(url);
    const notification = Notification.use();

    const { saveInDownload } = useSaveMediaContent();

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: 'Скачать файл',
            icon: <Icons variant="save" />,
            callback: () => {
                saveInDownload(fileBlob, name);
                notification.success({ title: 'Файл сохранен', system: true });
            },
        },
    ];

    function Doc() {
        return (
            <div className={styles.wrapper} onContextMenu={() => fileBlob && name && clickedFile?.set({ blob: fileBlob, name })}>
                <div className={styles.icon}>
                    <Icons.Document variant={extension as any} />
                </div>

                {(size || name || extension) && (
                    <div className={styles.caption}>
                        <Title textAlign="left" variant="H3R">
                            {name}
                        </Title>
                        {size && <Title variant="H3R">{sizeConverter(+size)}</Title>}
                    </div>
                )}
            </div>
        );
    }

    return !disableDownload ? (
        <Dropdown.Menu items={menuItems} trigger="right-click" closeAfterClick position="right-center" left={100}>
            <Doc />
        </Dropdown.Menu>
    ) : (
        <Doc />
    );
}

export default Document;
