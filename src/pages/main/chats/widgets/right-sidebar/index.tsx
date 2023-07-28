import React from 'react';

import { ChatsList } from 'features/chat';

import styles from './styles.module.scss';
import { useChatStore } from '../../../../../entities/chat';

function RightSidebar() {
    const setOpenRightSidebar = useChatStore.use.setOpenRightSidebar();

    return (
        <div className={styles.wrapper} onClick={() => setOpenRightSidebar(false)}>
            <div className={styles.list}>
                Ri
                {/* <ChatsList /> */}
            </div>
        </div>
    );
}

export default RightSidebar;
