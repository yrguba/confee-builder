import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from 'entities/user';
import { useViewerStore } from 'entities/viewer';
import { ChatsList } from 'features/chat';
import { useFileDownloads, useFileUploader } from 'shared/hooks';
import { Button, Notification } from 'shared/ui';

import styles from './styles.module.scss';
import { useAppStore } from '../../../../../entities/app';
import ImagesMessage from '../../../../../entities/message/ui/message/variants/images';

function LeftSidebar() {
    const navigate = useNavigate();

    const setOpenUserModal = useUserStore.use.setOpenModal();
    const setOpenViewerModal = useViewerStore.use.setOpenModal();
    const notification = Notification.Manager();

    const { Uploader, files } = useFileUploader({
        accept: 'image',
        multiple: true,
    });

    const click = () => {
        notification.success({ title: 'wd', callback: () => console.log('wdawd') });
    };

    return (
        <div className={styles.wrapper}>
            <Button onClick={click}>ff</Button>
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default LeftSidebar;
