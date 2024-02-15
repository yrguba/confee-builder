import React from 'react';

import chatGptAvatar from 'assets/images/1-15-10.jpeg';
import { BaseTypes } from 'shared/types';
import { Box, Button, Card, Icons, Image, Input } from 'shared/ui';

import styles from './styles.module.scss';
import { UseEasyStateReturnType } from '../../../../shared/hooks';
import { appService } from '../../../app';
import { MessageWithChatGpt } from '../../../message/model/types';

type Props = {
    sendMessage: () => void;
    message: UseEasyStateReturnType<string>;
    messages: MessageWithChatGpt[];
} & BaseTypes.Statuses;

function ChatGptView(props: Props) {
    const { sendMessage, message, messages } = props;

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                message.set((prev) => `${prev}\n`);
            } else {
                sendMessage();
            }
        }
    };

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.header}>
                <Card img={`${appService.getUrls().clientBaseURL}${chatGptAvatar}`} title="ChatGpt" subtitle="Бот" />
            </div>
            <div className={styles.list}>
                {messages.map((i) => (
                    <div key={i.id} className={styles.row} style={{ justifyContent: i.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div key={i.id} className={`${styles.message} ${i.role === 'user' ? styles.message_my : ''}`}>
                            {i.content}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.input}>
                <Input.Textarea
                    focusTrigger={['s']}
                    placeholder="Написать сообщение..."
                    focus
                    value={message.value}
                    onChange={(e) => message.set(e.target.value)}
                    onKeyDown={onKeyDown}
                />
                <div className={styles.sendBtn}>
                    <Button.Circle radius={30} variant="secondary" onClick={sendMessage}>
                        <Icons variant="send" />
                    </Button.Circle>
                </div>
            </div>
        </Box.Animated>
    );
}

export default ChatGptView;
