import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'entities/user';
import { useViewerStore } from 'entities/viewer';
import { ChatsList } from 'features/chat';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

function LeftSidebar() {
    const navigate = useNavigate();

    const setOpenUserModal = useUserStore.use.setOpenModal();
    const setOpenViewerModal = useViewerStore.use.setOpenModal();
    return (
        <>
            <div className={styles.wrapper}>
                <Button onClick={() => setOpenUserModal('contacts')}>Contacts</Button>
                <Button onClick={() => setOpenViewerModal('personal-info')}>PersonalInfoViewer</Button>
                <Button onClick={() => setOpenUserModal('personal-info')}>PersonalInfoUser</Button>
                <div className={styles.list}>
                    <ChatsList />
                </div>
            </div>
        </>
    );
}

export default LeftSidebar;
