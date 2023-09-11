import React from 'react';

import { appTypes } from 'entities/app';
import { useFetchMediaContent, useStorage, useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../../box';
import Button from '../../../../button';
import Icons from '../../../../icons';
import LoadingIndicator from '../../../../loading-indicator';
import { BaseImageProps } from '../../types';

function Image(props: BaseImageProps) {
    const { objectFit = 'cover', url, width, height, horizontalImgWidth, onClick, borderRadius = true, id, remove, ...other } = props;
    const storage = useStorage();

    const { src, error, isLoading, orientation } = useFetchMediaContent(url || '', storage.get('cache_size'));

    const classes = useStyles(styles, 'img', {
        [objectFit]: objectFit,
        error: error || !url,
    });

    const getWidth = () => {
        if (orientation === 'horizontal' && horizontalImgWidth) return horizontalImgWidth;
        return width;
    };

    return (
        <div onClick={onClick} className={styles.wrapper} style={{ width: getWidth(), height, borderRadius: borderRadius ? 12 : 0 }}>
            {!error && !isLoading && <img className={classes} src={src} alt="" />}
            {remove && (
                <Button.Circle radius={30} className={styles.remove} onClick={id ? () => remove(id) : () => ''} variant="inherit">
                    <Icons variant="delete" />
                </Button.Circle>
            )}
            <Box.Animated className={styles.loading} visible={isLoading} style={{ borderRadius: borderRadius ? 12 : 0 }}>
                <LoadingIndicator visible />
            </Box.Animated>
            {(error || !url) && icon}
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
