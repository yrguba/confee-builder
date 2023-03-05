import React from 'react';

import { MessageDropdownMenuFeature } from 'features/menu-dropdown';

import styles from './styles.module.scss';

function InfoNestedPage() {
    return (
        <div className={styles.info}>
            <MessageDropdownMenuFeature>drop</MessageDropdownMenuFeature>
        </div>
    );
}

export default InfoNestedPage;
