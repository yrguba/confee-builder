import React from 'react';

import styles from './styles.module.scss';
import { useStyles } from '../../../../hooks';
import { Avatar } from '../../../index';
import Title from '../../../title';
import { CardProps } from '../../types';

function Card(props: CardProps) {
    const { img, imgCover, title, subtitle, onClick, size = 's' } = props;

    const getAvatarSize = () => {
        if (size === 's') return 44;
        return 80;
    };

    const avatarSize = getAvatarSize();

    const classes = useStyles(styles, 'wrapper', {});

    return (
        <div className={classes} onClick={onClick}>
            <div className={styles.avatar}>
                <Avatar img={img} name={imgCover} size={avatarSize} />
            </div>
            <div className={styles.caption} style={{ width: `calc(100% - ${avatarSize}px - 12px)` }}>
                <Title variant="H4S">{title}</Title>
                <Title primary={false} variant="H4M">
                    {subtitle}
                </Title>
            </div>
        </div>
    );
}

export default Card;
