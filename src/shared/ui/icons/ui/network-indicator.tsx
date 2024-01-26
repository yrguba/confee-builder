import React from 'react';

import styles from './styles.module.scss';
import { NetworkIndicatorProps } from '../types';

function NetworkIndicator(props: NetworkIndicatorProps) {
    const { speed } = props;
    console.log(speed);

    const columns = [
        { id: 0, color: '#00FF00' },
        { id: 1, color: '#77FF00' },
        { id: 2, color: '#BBFF00' },
        { id: 3, color: '#FFBB00' },
        { id: 3, color: '#FF8800', value: '' },
        { id: 4, color: '#FF5511', value: '' },
        { id: 5, color: '#FF0000', value: '' },
    ];

    return <div className={styles.networkIndicator} />;
}
export default NetworkIndicator;
