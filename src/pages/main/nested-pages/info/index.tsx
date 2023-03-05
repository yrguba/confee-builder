import React from 'react';

import { MessageMenu } from 'entities/menu-dropdown';
import { Dropdown } from 'shared/ui';

import styles from './styles.module.scss';

function InfoNestedPage() {
    return (
        <div className={styles.info}>
            {/* <MessageMenu>menu</MessageMenu> */}
            <Dropdown trigger="hover" position="left-center">
                drop
            </Dropdown>
        </div>
    );
}

export default InfoNestedPage;
