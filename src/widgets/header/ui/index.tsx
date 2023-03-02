import React from 'react';

import { SearchMessagesFeature } from 'features/search';

import styles from './styles.module.scss';

function HeaderWidget() {
    return (
        <div className={styles.header}>
            <SearchMessagesFeature />
        </div>
    );
}

export default HeaderWidget;
