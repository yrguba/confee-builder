import React from 'react';

import { appTypes } from 'entities/app';
import { useEasyState, useFetchMediaContent, useSaveMediaContent, useStorage, useStyles, useWindowMouseClick } from 'shared/hooks';

import styles from './styles.module.scss';
import { useChatStore } from '../../../../../../entities/chat';
import { sizeConverter } from '../../../../../lib';
import Box from '../../../../box';
import Button from '../../../../button';
import Icons from '../../../../icons';
import { Dropdown, DropdownTypes } from '../../../../index';
import LoadingIndicator from '../../../../loading-indicator';
import Notification from '../../../../notification';
import Title from '../../../../title';
import { BaseImageProps } from '../../types';

function Image(props: BaseImageProps) {
    const {
        name,
        clickedFile,
        maxWidth,
        objectFit = 'cover',
        url,
        width,
        height,
        horizontalImgWidth,
        onClick,
        borderRadius = true,
        id,
        remove,
        disableDownload = true,
        ...other
    } = props;
    const storage = useStorage();

    const { src, error, fileBlob, isLoading } = useFetchMediaContent(url || '', storage.get('save_in_cache'));
    const idOfSavedFile = useChatStore.use.idOfSavedFile();

    const visibleMenu = useEasyState(false);

    const notification = Notification.use();

    const { saveInDownload, isLoading: loadingSaveFile } = useSaveMediaContent();

    const clickContextMenu = () => {
        if (clickedFile && fileBlob && name && id) {
            clickedFile.set({ blob: fileBlob, name, id, type: 'images' });
        }
        if (!disableDownload) {
            visibleMenu.set(true);
        }
    };

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: 'Скачать фото',
            icon: <Icons variant="save" />,
            callback: async () => {
                await saveInDownload(fileBlob, name);
                notification.success({ title: 'Фото сохранено', system: true });
                visibleMenu.set(false);
            },
        },
    ];

    const classes = useStyles(styles, 'img', {
        [objectFit]: objectFit,
        error: error || !url,
    });

    return (
        <div
            onMouseLeave={() => visibleMenu.set(false)}
            onContextMenu={clickContextMenu}
            onClick={onClick}
            className={styles.wrapper}
            style={{
                maxWidth,
                width: isLoading ? 100 : width,
                height,
                borderRadius: borderRadius ? 12 : 0,
                cursor: onClick ? 'pointer' : 'default',
            }}
        >
            {(loadingSaveFile || id === idOfSavedFile.value) && (
                <div className={styles.savingFile}>
                    <LoadingIndicator.Downloaded size={50} visible primary={false} />
                </div>
            )}
            {!error && !isLoading && <img onContextMenu={(e) => e.preventDefault()} className={classes} src={src} alt="" />}
            {remove && (
                <Button.Circle radius={30} className={styles.remove} onClick={id ? () => remove(id) : () => ''} variant="inherit">
                    <Icons variant="delete" />
                </Button.Circle>
            )}
            <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}>
                <LoadingIndicator visible />
            </Box.Animated>
            {(error || !url) && icon}
            <Dropdown.Fixed visible={visibleMenu.value} items={menuItems} />
        </div>
    );
}

export default Image;
const icon = (
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M61.25 55.4167V14.5833C61.25 11.375 58.625 8.75 55.4167 8.75H14.5833C11.375 8.75 8.75 11.375 8.75 14.5833V55.4167C8.75 58.625 11.375 61.25 14.5833 61.25H55.4167C58.625 61.25 61.25 58.625 61.25 55.4167ZM24.7917 39.375L32.0833 48.1542L42.2917 35L55.4167 52.5H14.5833L24.7917 39.375Z"
            fill="#E2E9F0"
        />
    </svg>
);
