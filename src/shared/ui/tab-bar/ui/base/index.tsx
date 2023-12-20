import React, { Fragment, useRef } from 'react';

import { useStyles, useDraggableScroll } from 'shared/hooks';

import styles from './styles.module.scss';
import Button from '../../../button';
import Icons from '../../../icons';
import { BaseTabBarProps, TabBarItem } from '../../types';

function BaseTabBar(props: BaseTabBarProps) {
    const { items, activeItemId, variant = '', clickTab, bodyStyle } = props;

    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    // const { events } = useDraggableScroll(ref);

    const classes = useStyles(styles, 'body', {
        [variant]: variant,
    });

    return (
        <div className={styles.wrapper}>
            <div className={classes} style={bodyStyle}>
                {items.map(
                    (i) =>
                        !i.hidden && (
                            <Fragment key={i.id}>
                                {variant === 'icons' ? (
                                    <Button.Circle
                                        variant="secondary"
                                        onClick={() => {
                                            i.callback();
                                            clickTab && clickTab(i);
                                        }}
                                    >
                                        <Icons variant={i.icon} />
                                    </Button.Circle>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            i.callback();
                                            clickTab && clickTab(i);
                                        }}
                                        key={i.id}
                                        variant={i.id === activeItemId ? 'primary' : 'secondary'}
                                        chips
                                    >
                                        {i.title}
                                    </Button>
                                )}
                            </Fragment>
                        )
                )}
            </div>
        </div>
    );
}

export default BaseTabBar;
