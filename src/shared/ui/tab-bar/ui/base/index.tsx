import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Button from '../../../button';
import Glare from '../../../loading-indicator/ui/glare';
import { BaseTabBarProps } from '../../types';

function BaseTabBar(props: BaseTabBarProps) {
    const { items, activeItemId } = props;

    const classes = useStyles(styles, 'wrapper', {});

    return (
        <div className={classes}>
            <div className={styles.body}>
                {items.map((i) => (
                    <Button onClick={i.callback} key={i.id} variant={i.id === activeItemId ? 'primary' : 'secondary'} chips>
                        {i.title}
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default BaseTabBar;
