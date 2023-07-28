import React from 'react';

import styles from './styles.module.scss';
import { useStyles } from '../../../../hooks';
import { Avatar } from '../../../index';
import Title from '../../../title';
import { CardProps } from '../../types';

function Card(props: CardProps) {
    const { img, imgCover, title, subtitle, size = 's' } = props;

    const getAvatarSize = () => {
        if (size === 's') return 44;
        return 80;
    };

    const classes = useStyles(styles, 'wrapper', {});

    return (
        <div className={classes}>
            <div className={styles.avatar}>
                <Avatar img={img} name={imgCover} size={getAvatarSize()} />
            </div>
            <div className={styles.caption}>
                <Title variant="H4S">{title}</Title>
                <Title primary={false} variant="H4M">
                    {subtitle}
                </Title>
            </div>
        </div>
    );
}

export default Card;
