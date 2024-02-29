import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCopyToClipboard } from 'react-use';
import { CopyToClipboardState } from 'react-use/lib/useCopyToClipboard';

import chatGptAvatar from 'assets/images/1-15-10.jpeg';
import { BaseTypes } from 'shared/types';
import { Box, Button, Card, ContextMenu, Icons, Image, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useEasyState, UseEasyStateReturnType, useWidthMediaQuery } from '../../../../shared/hooks';
import { appService } from '../../../app';
import { MessageWithChatGpt } from '../../../message/model/types';

type Props = {
    sendMessage: () => void;
    message: UseEasyStateReturnType<string>;
    messages: MessageWithChatGpt[];
    clearHistory: () => void;
    botTyping: boolean;
    openProfileModal: () => void;
} & BaseTypes.Statuses;

function ChatGptView(props: Props) {
    const { openProfileModal, clearHistory, sendMessage, message, messages, botTyping } = props;

    const visibleMenu = useEasyState(false);
    const messageText = useEasyState('');
    const [CopyToClipboardState, copyText] = useCopyToClipboard();

    const navigate = useNavigate();

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

    const menuItems = [
        {
            id: 0,
            title: 'Копировать текст',
            icon: <Icons variant="copy" />,
            payload: 'reply',
            callback: () => {
                copyText(messageText.value);
                messageText.set('');
                visibleMenu.set(false);
            },
        },
    ];

    const onContextMenu = (e: any, i: any) => {
        e.preventDefault();
        visibleMenu.toggle();
        messageText.set(i.content);
    };

    return (
        <Box.Animated visible className={styles.wrapper}>
            <ContextMenu trigger="contextmenu" clickAway={() => visibleMenu.set(false)} visible={visibleMenu.value} items={menuItems} />
            <div className={styles.header}>
                {useWidthMediaQuery().to('md') && (
                    <Button.Circle onClick={() => navigate(-1)} variant="secondary">
                        <Icons variant="arrow-left" />
                    </Button.Circle>
                )}
                <Card
                    onClick={openProfileModal}
                    img={`${appService.getUrls().clientBaseURL}${chatGptAvatar}`}
                    title="ChatGPT"
                    subtitle={botTyping ? 'Печатает...' : 'Бот'}
                />
                <Button.Circle variant="inherit" onClick={clearHistory}>
                    <Icons.BroomAnimated activeAnimate={false} />
                </Button.Circle>
            </div>
            <div className={styles.list}>
                <Box.Animated visible={!messages.length} className={styles.noMessages}>
                    <Title textWrap primary={false} textAlign="center" variant="H2">
                        Напишите, чтобы получить ответ на ваш вопрос
                    </Title>
                </Box.Animated>
                {messages.map((i) => (
                    <div key={i.id} className={styles.row} style={{ justifyContent: i.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div
                            onContextMenu={(e) => onContextMenu(e, i)}
                            key={i.id}
                            className={`${styles.message} ${i.role === 'user' ? styles.message_my : ''}`}
                        >
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
