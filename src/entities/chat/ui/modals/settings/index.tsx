import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../model/types';

type Props = {
    chat: ChatProxy | undefined;
    deleteChat: () => void;
} & BaseTypes.Statuses;

function ChatSettingsModalView(props: Props) {
    const { chat, deleteChat } = props;

    return (
        <div className={styles.wrapper}>
            <Button onClick={deleteChat}>delete chat</Button>
        </div>
    );
}

export default ChatSettingsModalView;
