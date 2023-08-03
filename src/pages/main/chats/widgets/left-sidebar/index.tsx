import React from 'react';

import { ChatsList } from 'features/chat';
import { useWebView } from 'shared/hooks';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

function LeftSidebar() {
    const webView = useWebView('/calls/audio_group', 'аудио звонок');

    const close = () => {
        webView?.close();
    };

    const click = () => {
        webView?.open();
    };

    return (
        <div className={styles.wrapper}>
            <Button onClick={click}>ff</Button>
            <Button onClick={() => close()}>close</Button>
            <div className={styles.list}>
                <ChatsList />
            </div>
        </div>
    );
}

export default LeftSidebar;
