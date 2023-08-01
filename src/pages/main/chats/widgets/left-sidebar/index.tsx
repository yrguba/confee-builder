import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'entities/user';
import { useViewerStore } from 'entities/viewer';
import { ChatsList } from 'features/chat';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';
import { useAppStore } from '../../../../../entities/app';

function LeftSidebar() {
    const navigate = useNavigate();

    const setOpenUserModal = useUserStore.use.setOpenModal();
    const setOpenViewerModal = useViewerStore.use.setOpenModal();
    const setNotifications = useAppStore.use.setNotifications();
    return (
        <div className={styles.wrapper}>
            <Button onClick={() => setNotifications({ title: 'dawddadw', description: 'dwaddwdwd' })}>ff</Button>
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default LeftSidebar;
