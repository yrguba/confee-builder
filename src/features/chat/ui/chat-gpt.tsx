import React from 'react';

import ChatGptView from 'entities/chat/ui/chat-gpt';
import { messageApi, useMessageStore } from 'entities/message';
import { useArray, useEasyState, useStorage } from 'shared/hooks';
import { getRandomString } from 'shared/lib';

import { ChatProxy } from '../../../entities/chat/model/types';
import { Modal } from '../../../shared/ui';
import { ChatGptModal } from '../index';

function ChatGpt() {
    const { data: history } = messageApi.handleGetMessagesWithChatGpt();
    const { mutate: handleSendTextMessageWithChatGpt } = messageApi.handleSendTextMessageWithChatGpt();
    const { mutate: handleClearHistoryWithChatGpt } = messageApi.handleClearHistoryWithChatGpt();

    const botTyping = useEasyState(false);

    const lastMessageWithChatGpt = useMessageStore.use.lastMessageWithChatGpt();

    const message = useEasyState('');
    const messages = useArray({
        initialArr: history?.map((i) => ({ id: getRandomString(10), ...i })).reverse(),
    });

    const confirmClearHistory = Modal.useConfirm((value) => {
        if (value) {
            lastMessageWithChatGpt.clear();
            handleClearHistoryWithChatGpt();
            messages.clear();
        }
    });

    const chatGptModal = Modal.use();

    const sendMessage = () => {
        botTyping.set(true);
        const myMsg = { id: getRandomString(10), content: message.value, role: 'user' } as any;
        lastMessageWithChatGpt.set(myMsg);
        messages.unshift(myMsg);

        handleSendTextMessageWithChatGpt(
            { text: message.value },
            {
                onSuccess: (data) => {
                    const botMsg = { id: getRandomString(10), content: data.data.message.content, role: 'assistant' } as any;
                    messages.unshift(botMsg);
                    lastMessageWithChatGpt.set(botMsg);
                    botTyping.set(false);
                },
            }
        );
        message.set('');
    };

    return (
        <>
            <ChatGptModal {...chatGptModal} />
            <Modal.Confirm {...confirmClearHistory} title="Очистить историю" okText="очистить" />
            <ChatGptView
                sendMessage={sendMessage}
                message={message}
                messages={messages.array}
                clearHistory={confirmClearHistory.open}
                botTyping={botTyping.value}
                openProfileModal={chatGptModal.open}
            />
        </>
    );
}

export default ChatGpt;
