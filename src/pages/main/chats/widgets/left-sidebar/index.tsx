import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'entities/user';
import { useViewerStore } from 'entities/viewer';
import { ChatsList } from 'features/chat';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

function LeftSidebar() {
    const navigate = useNavigate();

    const setOpenContactsModal = useUserStore.use.setOpenContactsModal();
    const useeee = useUserStore.use.setOpenPersonalInfoModal();
    const setOpenPersonalInfoModal = useViewerStore.use.setOpenPersonalInfoModal();
    return (
        <>
            <div className={styles.wrapper}>
                <Button onClick={() => setOpenContactsModal(true)}>Contacts</Button>
                <Button onClick={() => setOpenPersonalInfoModal(true)}>PersonalInfoViewer</Button>
                <Button onClick={() => useeee(true)}>PersonalInfoUser</Button>
                <div className={styles.list}>
                    <ChatsList />
                </div>
            </div>
        </>
    );
}

export default LeftSidebar;
