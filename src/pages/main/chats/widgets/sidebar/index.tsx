import React from 'react';

import { ChatsList, CreteChatModal, SearchChats, TabsChats } from 'features/chat';
import { useHeightMediaQuery, useSip, useRendersCount } from 'shared/hooks';
import { Button, Icons, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    const miniSearch = useHeightMediaQuery().to('sm');

    const createChatModal = Modal.use();

    const rt = useRendersCount();
    console.log('ChatsListView', rt);

    return (
        <>
            <CreteChatModal createChatModal={createChatModal} />
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
        </>
    );
}

export default Sidebar;
