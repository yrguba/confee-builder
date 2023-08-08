import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { chatApi } from 'entities/chat';
import { messageApi, MessageInputView, messageTypes } from 'entities/message';
import { userTypes } from 'entities/user';
import { viewerService } from 'entities/viewer';
import { useEasyState } from 'shared/hooks';

function MessageInput() {
    const params = useParams();
    const chatId = Number(params.chat_id);

    const { mutate: handleSendTextMessage, isLoading } = messageApi.handleSendTextMessage();
    const { mutate: handleSendFileMessage } = messageApi.handleSendFileMessage();
    // const { mutate: handleMessageAction } = MessageApi.handleMessageAction();
    const { mutate: handleReplyMessage } = messageApi.handleReplyMessage();
    const { mutate: handleChangeTextInMessages } = messageApi.handleChangeTextInMessages();

    const { data: chatData } = chatApi.handleGetChat({ chatId });

    const messageTextState = useEasyState('');

    const sendMessage = () => {
        if (messageTextState.value) {
            handleSendTextMessage({ text: messageTextState.value, chatId });
            messageTextState.set('');
        }
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                messageTextState.set((prev) => `${prev}\n`);
            } else {
                sendMessage();
            }
        }
    };

    const clickOnEmoji = (emoji: string) => {
        messageTextState.set((prev) => prev + emoji);
    };

    useEffect(() => {
        messageTextState.set('');
    }, [chatId]);

    return (
        <>
            <MessageInputView
                onKeyDown={onKeyDown}
                messageTextState={messageTextState}
                clickOnEmoji={clickOnEmoji}
                btnClick={sendMessage}
                loading={isLoading}
            />
        </>
    );
}

export default MessageInput;
