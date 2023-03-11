import React from 'react';

import { MessageDropdownMenu } from 'features/menu-dropdown';

import styles from './styles.module.scss';
import { Avatar, Dropdown } from '../../../../../../shared/ui';

function MessagesPage() {
    return (
        <div className={styles.page}>
            <MessageDropdownMenu>dwa</MessageDropdownMenu>
        </div>
    );
}

export default MessagesPage;
