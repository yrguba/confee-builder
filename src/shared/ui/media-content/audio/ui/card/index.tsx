import React, { useEffect } from 'react';

import styles from './styles.module.scss';
import Audio from '../..';
import { useEasyState, useFs } from '../../../../../hooks';
import { sizeConverter } from '../../../../../lib';
import Icons from '../../../../icons';
import { ContextMenu, ContextMenuTypes, Dropdown, DropdownTypes } from '../../../../index';
import Notification from '../../../../notification';
import Title from '../../../../title';
import { AudioCardProps } from '../../types';

function AudioCard(props: AudioCardProps) {
    const { disabled, url, size, name } = props;
    const visibleMenu = useEasyState(false);
    const notification = Notification.use();

    const fs = useFs();

    const progress = useEasyState(0);

    const saveFile = () => {
        if (name && url) {
            fs.save({ baseDir: 'download', url, fileName: name, progressCallback: (percent) => progress.set(percent) });
        }
    };

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        visibleMenu.toggle();
    };

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: 'Скачать аудио',
            icon: <Icons variant="save" />,
            callback: async () => {
                visibleMenu.set(false);
                saveFile();
                notification.success({ title: 'Аудио сохранен', system: true });
            },
        },
    ];

    useEffect(() => {
        if (progress.value === 100) {
            notification.success({ title: 'Аудио сохранен', system: true });
        }
    }, [progress.value]);

    return (
        <div className={styles.wrapper} onMouseLeave={() => visibleMenu.set(false)} onContextMenu={clickContextMenu}>
            <div className={styles.icon}>
                <Audio.Voice disabled={disabled} url={url} btnRadius={34} visibleWave={false} />
            </div>
            <div className={styles.caption}>
                <Title variant="H3M">{name}</Title>
                <Title variant="H4M">{sizeConverter(size)}</Title>
            </div>
            <ContextMenu visible={visibleMenu.value} items={menuItems} />
        </div>
    );
}
export default AudioCard;
