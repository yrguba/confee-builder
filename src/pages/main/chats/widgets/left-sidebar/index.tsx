import React, { useEffect } from 'react';

import { callsTypes } from 'entities/calls';
import { ChatsList } from 'features/chat';
import { useEasyState, useWebView, useWebSocket } from 'shared/hooks';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

function LeftSidebar() {
    const close = () => {};

    const click = () => {};

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

export default LeftSidebar;
