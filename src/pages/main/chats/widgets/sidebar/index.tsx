import React from 'react';

import { ChatsList, CreateChatModal } from 'features/chat';
import { useHeightMediaQuery } from 'shared/hooks';
import { Button, Icons, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    const createChatModal = Modal.use();

    return (
        <>
            <CreateChatModal {...createChatModal} />
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <Title variant="H2">Сообщения</Title>
                        <Button.Circle variant="inherit" radius={24} onClick={() => window.location.reload()}>
                            <Icons variant="reload" />
                        </Button.Circle>
                    </div>

                    <div className={styles.icons}>
                        <Button.Circle variant="secondary" onClick={() => createChatModal.open()}>
                            <Icons variant="new-message" />
                        </Button.Circle>
                    </div>
                </div>
                <div className={styles.list}>
                    <ChatsList />
                </div>
            </div>
        </>
    );
}

export default Sidebar;
