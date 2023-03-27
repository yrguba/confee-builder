import React from 'react';

import { ChatsList } from 'features/chat';
import { SearchChats } from 'features/search';

import styles from './styles.module.scss';

function UserRightSidebarChatsPage() {
    const dictionary = {
        info: {
            title: 'Информация',
        },
    };

    return <div className={styles.sidebar}>UserRightSidebarChatsPage</div>;
}

export default UserRightSidebarChatsPage;
