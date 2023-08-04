import React, { useEffect } from 'react';

import { callsTypes } from 'entities/calls';
import { viewerTypes } from 'entities/viewer';
import { ChatsList } from 'features/chat';
import { useEasyState, useWebView, useWebSocket } from 'shared/hooks';
import { Button, Modal } from 'shared/ui';

import styles from './styles.module.scss';

function Sidebar() {
    const close = () => {};
    const a = Modal.use<viewerTypes.ModalName>('viewer-personal-info');
    const click = () => {
        a.open();
    };

    return (
        <div className={styles.wrapper}>
            {/* <Button onClick={click}>ff</Button> */}
            {/* <Button onClick={() => close()}>close</Button> */}
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default Sidebar;
