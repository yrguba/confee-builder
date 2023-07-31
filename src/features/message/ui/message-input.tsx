import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAppStore } from 'entities/app';
import { chatApi } from 'entities/chat';
import { messageApi, MessageInputView, useMessageStore } from 'entities/message';
import { UserTypes } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useAudioRecorder } from 'shared/hooks';

type Props = {};

function MessageInput(props: Props) {
    const params = useParams();
    const chatId = Number(params.chat_id);

    const { mutate: handleSendTextMessage, isLoading } = messageApi.handleSendTextMessage();

    const [valueTextMessage, setValueTextMessage] = useState('');

    const audioRecorder = useAudioRecorder({
        // onAfterSaving: (data) => {
        //     handleSendFileMessage({
        //         files: data,
        //         chatId,
        //     });
        // },
    });

    const inputOnChange = (event: any) => {
        setValueTextMessage(event.target.value);
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

    const getTagAUsers = (): UserTypes.User[] | null => {
        // if (!chat || !chat.is_group) return null;
        // const words = valueTextMessage.split(' ');
        // const all = words.find((word) => /^@$/.test(word));
        // const tags = words.filter((word) => /@[a-zA-Zа-яА-я0-9]/.test(word));
        // const lastWordIsTag = /@[a-zA-Zа-яА-я0-9]/.test(words[words.length - 1]);
        // const suitable: UserTypes.User[] = [];
        // const users = chat.members.filter((user) => !!user.nickname && user.id !== ViewerService.getViewer()?.id);
        // if (all) {
        //     suitable.splice(0, 0, ...users);
        //     return suitable;
        // }
        // if (tags.length && lastWordIsTag) {
        //     tags.forEach((tag) => {
        //         users.forEach((user) => {
        //             if (user.nickname.includes(tag.substring(1))) {
        //                 suitable.push(user);
        //             }
        //         });
        //     });
        //     return suitable;
        // }
        return null;
    };

    const clickUser = (user: UserTypes.User) => {
        const val = valueTextMessage.split('@');
        val[val.length - 1] = `${user.nickname} `;
        setValueTextMessage(val.join('@'));
    };

    return (
        <>
            <MessageInputView
                onChange={inputOnChange}
                onKeyDown={onKeyDown}
                value={valueTextMessage}
                clickOnEmoji={clickOnEmoji}
                btnClick={sendMessage}
                loading={isLoading}
            />
        </>
    );
}

export default MessageInput;
