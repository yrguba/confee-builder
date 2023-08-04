import React from 'react';

import { ChatsList } from 'features/chat';
import { Icons, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Сообщения</Title>
                <Icons variant="new-message" />
            </div>

            <div className={styles.search}>
                <Input prefixIcon="search" placeholder="Поиск" />
            </div>
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default Sidebar;
