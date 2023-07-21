import React from 'react';

import { CheckUpdate } from 'features/app';

import styles from './styles.module.scss';

function CheckUpdateWidget() {
    return (
        <div className={styles.wrapper}>
            <CheckUpdate />
        </div>
    );
}

export default CheckUpdateWidget;
