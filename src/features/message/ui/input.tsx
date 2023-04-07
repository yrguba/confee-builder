import React, { useState } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessageInputView } from 'entities/message';

type Props = {};

function MessageInput(props: Props) {
    const params = useParams();

    const { mutate: handleSendTextMessage, isLoading } = MessageApi.handleSendTextMessage();
    const handleMessageAction = MessageApi.handleMessageAction();

    const [valueTextMessage, setValueTextMessage] = useState('');

    const onChange = (event: any) => {
        handleMessageAction({ chatId: Number(params.chat_id), action: 'typing' });
        setValueTextMessage(event.target.value);
    };

    const sendMessage = () => {
        handleSendTextMessage(
            {
                text: valueTextMessage,
                chatId: Number(params.chat_id),
            },
            {
                onSuccess: (res) => {},
            }
        );
        setValueTextMessage('');
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey) {
                setValueTextMessage((prev) => `${prev}\n`);
            } else {
                sendMessage();
            }
        }
    };

    return <MessageInputView onChange={onChange} onKeyDown={onKeyDown} value={valueTextMessage} btnClick={sendMessage} loading={isLoading} />;
}

export default MessageInput;
