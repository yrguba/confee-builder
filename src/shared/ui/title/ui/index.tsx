import cn from 'classnames';
import cnBind from 'classnames/bind';
import React from 'react';

import styles from './styles.module.scss';
import { Props } from '../types';

function Title(props: Props) {
    const { children, isError, variant } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('title', {
            error: isError,
            variant,
        })
    );

    return <div className={classes}>{children}</div>;
}

export default Title;
