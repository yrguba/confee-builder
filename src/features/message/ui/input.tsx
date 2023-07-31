import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAppStore } from 'entities/app';
import { chatApi } from 'entities/chat';
import { messageApi, MessageInputView, useMessageStore } from 'entities/message';
import { userTypes } from 'entities/user';
import { viewerService } from 'entities/viewer';
import { useAudioRecorder } from 'shared/hooks';

type Props = {};

function MessageInput(props: Props) {
    const params = useParams();
    const chatId = Number(params.chat_id);

    const { mutate: handleSendTextMessage, isLoading } = messageApi.handleSendTextMessage();
    const { mutate: handleSendFileMessage } = messageApi.handleSendFileMessage();
    // const { mutate: handleMessageAction } = MessageApi.handleMessageAction();
    const { mutate: handleReplyMessage } = messageApi.handleReplyMessage();
    const { mutate: handleChangeTextInMessages } = messageApi.handleChangeTextInMessages();

    const { data: chatsData } = chatApi.handleGetChats();
    const chat = chatsData?.data?.find((chat) => chat.id === Number(params.chat_id));

    const [valueTextMessage, setValueTextMessage] = useState('');

    const audioRecorder = useAudioRecorder({
        onAfterSaving: (data) => {
            handleSendFileMessage({
                files: data,
                chatId,
            });
        },
    });

    const inputOnChange = (event: any) => {
        // handleMessageAction({ chatId, action: 'typing' });
        setValueTextMessage(event.target.value);
    };

    const changeTextInMessage = () => {
        setValueTextMessage('');
    };

    const replyToMessage = () => {
        setValueTextMessage('');
    };

    const sendMessage = () => {
        if (valueTextMessage) {
            handleSendTextMessage({ text: valueTextMessage, chatId });
            setValueTextMessage('');
        }
    };

    const onKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            if (event.shiftKey || event.ctrlKey) {
                setValueTextMessage((prev) => `${prev}\n`);
            } else {
                sendMessage();
            }
        }
    };

    const clickOnEmoji = (emoji: string) => {
        setValueTextMessage((prev) => prev + emoji);
    };

    useEffect(() => {
        setValueTextMessage('');
    }, [chatId]);

    const getTagAUsers = (): userTypes.User[] | null => {
        if (!chat || !chat.is_group) return null;
        const words = valueTextMessage.split(' ');
        const all = words.find((word) => /^@$/.test(word));
        const tags = words.filter((word) => /@[a-zA-Zа-яА-я0-9]/.test(word));
        const lastWordIsTag = /@[a-zA-Zа-яА-я0-9]/.test(words[words.length - 1]);
        const suitable: userTypes.User[] = [];
        const users = chat.members.filter((user) => !!user.nickname && user.id !== viewerService.getId());
        if (all) {
            suitable.splice(0, 0, ...users);
            return suitable;
        }
        if (tags.length && lastWordIsTag) {
            tags.forEach((tag) => {
                users.forEach((user) => {
                    if (user.nickname.includes(tag.substring(1))) {
                        suitable.push(user);
                    }
                });
            });
            return suitable;
        }
        return null;
    };

    const clickUser = (user: userTypes.User) => {
        const val = valueTextMessage.split('@');
        val[val.length - 1] = `${user.nickname} `;
        setValueTextMessage(val.join('@'));
    };

    return (
        <>
            <MessageInputView
                clickUser={clickUser}
                tagAUsers={getTagAUsers()}
                audioRecorder={audioRecorder}
                messageToEdit={null}
                messageToReply={null}
                removeMessageToEdit={() => ''}
                removeMessageToReply={() => ''}
                onChange={inputOnChange}
                onKeyDown={onKeyDown}
                value={valueTextMessage}
                setIsOpenEmojiPicker={() => ''}
                setIsOpenInputMenu={() => ''}
                clickOnEmoji={clickOnEmoji}
                btnClick={sendMessage}
                loading={isLoading}
            />
        </>
    );
}

export default MessageInput;
