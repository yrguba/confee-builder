import React from 'react';

import styles from './styles.module.scss';
import { useEasyState, useSaveMediaContent } from '../../../../../hooks';
import { sizeConverter } from '../../../../../lib';
import Icons from '../../../../icons';
import { Dropdown, DropdownTypes } from '../../../../index';
import Notification from '../../../../notification';
import Title from '../../../../title';
import { AudioCardProps } from '../../types';
import AudioPlayer from '../base';

function AudioCard(props: AudioCardProps) {
    const { disabled, url, size, name } = props;
    const visibleMenu = useEasyState(false);
    const notification = Notification.use();

    const { saveInDownload, isLoading } = useSaveMediaContent();

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        visibleMenu.set(true);
    };

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
        {
            id: 1,
            title: 'Скачать аудио',
            icon: <Icons variant="save" />,
            callback: async () => {
                const fileBlob = await fetch(url).then((res) => res.blob());
                await saveInDownload(fileBlob, name);
                notification.success({ title: 'Аудио сохранен', system: true });
            },
        },
        {
            id: 2,
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
        <div className={styles.wrapper} onMouseLeave={() => visibleMenu.set(false)} onContextMenu={clickContextMenu}>
            <div className={styles.icon}>
                <AudioPlayer disabled={disabled} url={url} btnRadius={34} visibleWave={false} />
            </div>
            <div className={styles.caption}>
                <Title variant="H3M">{name}</Title>
                <Title variant="H4M">{sizeConverter(size)}</Title>
            </div>
            <Dropdown.Fixed visible={visibleMenu.value} items={menuItems} />
        </div>
    );
}
export default AudioCard;
