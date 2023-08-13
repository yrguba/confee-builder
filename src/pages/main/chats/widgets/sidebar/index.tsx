import React from 'react';

import { viewerTypes } from 'entities/viewer';
import { ChatsList, SearchChats, TabsChats } from 'features/chat';
import { useHeightMediaQuery, useSip } from 'shared/hooks';
import { Button, Icons, Modal, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useCallsStore } from '../../../../../entities/calls';

function Sidebar() {
    const miniSearch = useHeightMediaQuery().to('sm');

    const a = Modal.use<viewerTypes.ModalName>('viewer-personal-info');

    const testState = useCallsStore.use.testState();
    console.log(testState.value);
    const sip = useSip({});

    return (
        <div className={styles.wrapper}>
            <div className={styles.header} onClick={testState.set}>
                <Title variant="H2">Сообщения</Title>
                <div className={styles.icons}>
                    <Button.Circle variant="secondary" onClick={() => a.open()}>
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
