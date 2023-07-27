import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'entities/user';
import { ChatsList } from 'features/chat';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

function LeftSidebar() {
    const navigate = useNavigate();

    const setOpenContactsModal = useUserStore.use.setOpenContactsModal();

    return (
        <>
            <div className={styles.wrapper}>
                <Button onClick={() => setOpenContactsModal(true)}>modal</Button>
                <div className={styles.list}>
                    <ChatsList />
                </div>
            </div>
        </>
    );
}

export default LeftSidebar;
