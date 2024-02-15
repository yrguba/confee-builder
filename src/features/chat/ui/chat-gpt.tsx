import React, { useEffect } from 'react';

import ChatGptView from 'entities/chat/ui/chat-gpt';
import { messageApi } from 'entities/message';
import { useArray, useEasyState } from 'shared/hooks';
import { getRandomString } from 'shared/lib';

function ChatGpt() {
    const { data: history } = messageApi.handleGetMessagesWithChatGpt();
    const { mutate: handleSendTextMessageWithChatGpt } = messageApi.handleSendTextMessageWithChatGpt();

    const message = useEasyState('');
    const messages = useArray({
        initialArr: history?.map((i) => ({ id: getRandomString(10), ...i })).reverse(),
    });

    const sendMessage = () => {
        messages.unshift({ id: getRandomString(10), content: message.value, role: 'user' });
        handleSendTextMessageWithChatGpt(
            { text: message.value },
            {
                onSuccess: (data) => {
                    messages.unshift({ id: getRandomString(10), content: data.data.message.content, role: 'assistant' });
                },
            }
        );
        message.set('');
    };

    return <ChatGptView sendMessage={sendMessage} message={message} messages={messages.array} />;
}
//
export default ChatGpt;
