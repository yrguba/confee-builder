import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import * as rrd from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
    children: any;
    to: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    isError?: boolean;
};

function Link(props: Props) {
    const { children, to, isDisabled, isLoading, isError, ...other } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('link', {
            disabled: isDisabled,
            loading: isLoading,
            error: isError,
        })
    );

    return (
        <rrd.Link className={classes} to={to} {...other}>
            {children}
        </rrd.Link>
    );
}

export default Link;
