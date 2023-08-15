import React from 'react';

import { chatTypes } from 'entities/chat';
import { viewerTypes } from 'entities/viewer';
import { ChatsList, SearchChats, TabsChats } from 'features/chat';
import { useHeightMediaQuery, useSip } from 'shared/hooks';
import { Button, Icons, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    const miniSearch = useHeightMediaQuery().to('sm');

    const createChatModal = Modal.use<chatTypes.Modals>('createChat');

    const sip = useSip({});

    return (
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
            {!miniSearch && (
                <div className={styles.search}>
                    <SearchChats />
                </div>
            )}
            <div className={styles.tabs}>
                <TabsChats />
            </div>
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default Sidebar;
