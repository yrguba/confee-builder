import React from 'react';

import { ChatsList, CreteChatModal } from 'features/chat';
import { useHeightMediaQuery } from 'shared/hooks';
import { Button, Icons, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    const miniSearch = useHeightMediaQuery().to('sm');
    const createChatModal = Modal.use();

    return (
        <>
            <CreteChatModal {...createChatModal} />
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <Title variant="H2">Сообщения</Title>
                    <div className={styles.icons}>
                        <Button.Circle variant="secondary" onClick={() => createChatModal.open()}>
                            <Icons variant="new-message" />
                        </Button.Circle>
                        {miniSearch && <Icons variant="search" />}
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
