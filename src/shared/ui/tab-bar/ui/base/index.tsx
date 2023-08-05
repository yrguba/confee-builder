import React from 'react';

import { useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import Glare from '../../../loading-indicator/ui/glare';
import { BaseTabBarProps } from '../../types';

function BaseTabBar(props: BaseTabBarProps) {
    // const {  } = props;

    const classes = useStyles(styles, 'wrapper', {});

    return <div>BaseTabBar</div>;
}

export default BaseTabBar;
