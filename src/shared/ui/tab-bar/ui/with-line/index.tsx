import React, { Fragment, useRef } from 'react';

import { useStyles, useDraggableScroll } from 'shared/hooks';

import styles from './styles.module.scss';
import Button from '../../../button';
import Icons from '../../../icons';
import { BaseTabBarProps } from '../../types';

function TabBarWithLine(props: BaseTabBarProps) {
    const { items, activeItemId, variant = '', bodyStyle } = props;

    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggableScroll(ref);

    const classes = useStyles(styles, 'body', {
        [variant]: variant,
    });

    return <div className={styles.wrapper}>TabBarWithLine</div>;
}

export default TabBarWithLine;
