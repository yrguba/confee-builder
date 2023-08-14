import React, { useState } from 'react';

import { useFetchMediaContent, useStorage, useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { appTypes } from '../../../../../entities/app';
import Box from '../../../box';
import LoadingIndicator from '../../../loading-indicator';
import { ImageProps } from '../types';

function Image(props: ImageProps) {
    const { img, width, height, horizontalImgWidth, onClick, ...other } = props;
    const storage = useStorage<appTypes.ValuesInStorage>();

    const { src, error, isLoading, orientation } = useFetchMediaContent(img || '', storage.get('cache_size'));

    const classes = useStyles(styles, 'img', {
        error: error || !img,
    });

    const getWidth = () => {
        if (orientation === 'horizontal' && horizontalImgWidth) return horizontalImgWidth;
        return width;
    };

    return (
        <div onClick={onClick} className={styles.wrapper} style={{ width: getWidth(), height }}>
            {!isLoading && !error && <img className={classes} src={src} alt="" />}
            <Box.Animated className={styles.loading} visible={isLoading}>
                <LoadingIndicator visible />
            </Box.Animated>
            {(error || !img) && icon}
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
