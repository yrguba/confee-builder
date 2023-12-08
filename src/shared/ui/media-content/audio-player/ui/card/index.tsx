import React from 'react';

import styles from './styles.module.scss';
import { useSaveMediaContent } from '../../../../../hooks';
import { sizeConverter } from '../../../../../lib';
import Icons from '../../../../icons';
import { Dropdown, DropdownTypes } from '../../../../index';
import Notification from '../../../../notification';
import Title from '../../../../title';
import { AudioCardProps } from '../../types';
import AudioPlayer from '../base';

function AudioCard(props: AudioCardProps) {
    const { disabled, url, size, name } = props;

    const notification = Notification.use();

    const { saveInDownload, isLoading } = useSaveMediaContent();

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: 'Скачать аудио',
            icon: <Icons variant="save" />,
            callback: async () => {
                const fileBlob = await fetch(url).then((res) => res.blob());
                await saveInDownload(fileBlob, name);
                notification.success({ title: 'Аудио сохранен', system: true });
            },
        },
    ];

    return (
        <Dropdown.Menu items={menuItems} trigger="right-click" closeAfterClick position="right-center" left={100}>
            <div className={styles.wrapper}>
                <div className={styles.icon}>
                    <AudioPlayer disabled={disabled} url={url} btnRadius={34} visibleWave={false} />
                </div>
                <div className={styles.caption}>
                    <Title variant="H3M">{name}</Title>
                    <Title variant="H4M">{sizeConverter(size)}</Title>
                </div>
            </div>
        </Dropdown.Menu>
    );
}
export default AudioCard;
