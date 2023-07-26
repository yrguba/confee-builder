import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatsList, SearchChats } from 'features/chat';

import styles from './styles.module.scss';
import { useUserStore } from '../../../../entities/user';
import { Button } from '../../../../shared/ui';

function LeftSidebar() {
    const navigate = useNavigate();

    const setOpenContactsModal = useUserStore.use.setOpenContactsModal();

    return (
        <>
            <div className={styles.wrapper}>
                <Button onClick={() => setOpenContactsModal(true)}>modal</Button>
                <div className={styles.search}>
                    <SearchChats />
                </div>
                <div className={styles.list}>
                    <ChatsList />
                </div>
            </div>
        </>
    );
}

export default LeftSidebar;
