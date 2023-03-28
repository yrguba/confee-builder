import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessageInputView, useMessageStore } from 'entities/message';

type Props = {};

function MessageInput(props: Props) {
    // const { children } = props;

    const params = useParams();

    const { mutate: handleSendTextMessage, isLoading } = MessageApi.handleSendTextMessage();

    const [valueTextMessage, setValueTextMessage] = useState('');

    const onChange = (event: any) => setValueTextMessage(event.target.value);

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
