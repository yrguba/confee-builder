import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { MessageApi, MessageInputView, useMessageStore } from 'entities/message';

type Props = {};

function MessageInput(props: Props) {
    const params = useParams();
    const chatId = Number(params.chat_id);
    const { mutate: handleSendTextMessage, isLoading } = MessageApi.handleSendTextMessage();
    const { mutate: handleMessageAction } = MessageApi.handleMessageAction();
    const { mutate: handleChangeTextInMessages } = MessageApi.handleChangeTextInMessages();

    const editableMessage = useMessageStore.use.editableMessage();
    const setEditableMessage = useMessageStore.use.setEditableMessage();
    const setIsOpenEmojiPicker = useMessageStore.use.setIsOpenEmojiPicker();

    const [valueTextMessage, setValueTextMessage] = useState('');

    const onChange = (event: any) => {
        handleMessageAction({ chatId, action: 'typing' });
        setValueTextMessage(event.target.value);
    };

    const changeTextInMessage = () => {
        editableMessage && handleChangeTextInMessages({ chatId, messageId: editableMessage.id, text: valueTextMessage });
        setEditableMessage(null);
        setValueTextMessage('');
    };

    const sendMessage = () => {
        if (editableMessage) {
            return changeTextInMessage();
        }
        handleSendTextMessage({ text: valueTextMessage, chatId });
        setValueTextMessage('');
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey) {
                setValueTextMessage((prev) => `${prev}\n`);
            } else {
                if (editableMessage) {
                    return changeTextInMessage();
                }
                sendMessage();
            }
        }
    };

    const clickOnEmoji = (emoji: string) => {
        setValueTextMessage((prev) => prev + emoji);
    };

    useEffect(() => {
        if (editableMessage) {
            setValueTextMessage(editableMessage.text);
        } else {
            setValueTextMessage('');
        }
    }, [editableMessage]);

    return (
        <MessageInputView
            editableMessage={editableMessage}
            removeEditableMessage={() => setEditableMessage(null)}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={valueTextMessage}
            openClosePickerTrigger={setIsOpenEmojiPicker}
            clickOnEmoji={clickOnEmoji}
            btnClick={sendMessage}
            loading={isLoading}
        />
    );
}

export default MessageInput;
