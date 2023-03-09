import React, { ButtonHTMLAttributes } from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';

type Props = {
    size?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Avatar(props: Props) {
    const { size } = props;

    const classes = useStyles(styles, 'avatar', {});

    return (
        <div className={classes} style={{ width: size, height: size }}>
            A
        </div>
    );
}

export default Avatar;
