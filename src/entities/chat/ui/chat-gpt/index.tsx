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
    clearHistory: () => void;
    botTyping: boolean;
} & BaseTypes.Statuses;

function ChatGptView(props: Props) {
    const { clearHistory, sendMessage, message, messages, botTyping } = props;

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                message.set((prev) => `${prev}\n`);
            } else {
                message.value.length && sendMessage();
            }
        }
    };

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.header}>
                <Card img={`${appService.getUrls().clientBaseURL}${chatGptAvatar}`} title="ChatGpt" subtitle={botTyping ? 'Печатает...' : 'Бот'} />
                <Button.Circle variant="inherit" onClick={clearHistory}>
                    <Icons.BroomAnimated activeAnimate={false} />
                </Button.Circle>
            </div>
            <div className={styles.list}>
                <Box.Animated visible={!messages.length} className={styles.noMessages}>
                    Напишите первым
                </Box.Animated>
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
                <Box.Animated visible={!!message.value.length} className={styles.sendBtn}>
                    <Button.Circle radius={30} variant="secondary" onClick={sendMessage}>
                        <Icons variant="send" />
                    </Button.Circle>
                </Box.Animated>
            </div>
        </Box.Animated>
    );
}

export default ChatGptView;
