import React from 'react';

import { CheckUpdate as CheckUpdateFeature } from 'features/app';

import styles from './styles.module.scss';

function CheckUpdate() {
    return (
        <div className={styles.wrapper}>
            <CheckUpdateFeature />
        </div>
    );
}

export default CheckUpdate;
