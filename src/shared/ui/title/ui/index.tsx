import cn from 'classnames';
import cnBind from 'classnames/bind';
import React from 'react';

import styles from './styles.module.scss';
import { TitleProps } from '../types';

function Title(props: TitleProps) {
    const { children, isError, textWrap, primary = true, variant, textAlign } = props;

    const cx = cnBind.bind(styles);

    const classes = cn(
        cx('wrapper', {
            error: isError,
            [variant]: variant,
            primary,
            textWrap,
        })
    );

    return (
        <div style={{ textAlign }} className={classes}>
            {children}
        </div>
    );
}

export default Title;
