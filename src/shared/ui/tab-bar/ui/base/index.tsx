import React, { Fragment, useEffect, useRef } from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Button from '../../../button';
import Icons from '../../../icons';
import { BaseTabBarProps, TabBarItem } from '../../types';

function BaseTabBar(props: BaseTabBarProps) {
    const { items, activeItemId, variant = '', clickTab, bodyStyle } = props;

    const btnRef = useRef<HTMLButtonElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const classes = useStyles(styles, 'body', {
        [variant]: variant,
    });

    useEffect(() => {
        if (btnRef.current && bodyRef.current) {
            const btnRect = btnRef?.current?.getBoundingClientRect();
            const last = items[items.length - 1].id === activeItemId ? 9 * items.length : 0;
            bodyRef.current.scrollTo({
                left: btnRef.current.offsetLeft - btnRect.width + last,
            });
        }
    }, [btnRef.current, activeItemId]);

    return (
        <div className={styles.wrapper}>
            <div className={classes} ref={bodyRef}>
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
                                        ref={i.id === activeItemId ? btnRef : null}
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
