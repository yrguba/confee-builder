import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'entities/user';
import { useViewerStore } from 'entities/viewer';
import { ChatsList } from 'features/chat';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';
import { useAppStore } from '../../../../../entities/app';
import ImagesMessage from '../../../../../entities/message/ui/message/variants/images';
import { useFileDownloads, useFileUploader } from '../../../../../shared/hooks';

function LeftSidebar() {
    const navigate = useNavigate();

    const setOpenUserModal = useUserStore.use.setOpenModal();
    const setOpenViewerModal = useViewerStore.use.setOpenModal();
    const setNotifications = useAppStore.use.setNotifications();

    const { Uploader, files } = useFileUploader({
        accept: 'image',
        multiple: true,
    });

    return (
        <div className={styles.wrapper}>
            {/* <Button onClick={() => setNotifications({ title: 'dawddadw', description: 'dwaddwdwd' })}>ff</Button> */}
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default LeftSidebar;
