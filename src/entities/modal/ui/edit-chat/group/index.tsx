import React, { useEffect, useState } from 'react';

import { ChatTypes } from 'entities/chat';
import { UserCardView, UserTypes, UserService } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useInput, useArray, useFileUploader } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Icons, Avatar } from 'shared/ui';

import styles from './styles.module.scss';
import { http } from '../../../../../shared/constanst';
import { name } from '../../../../../shared/constanst/project-info';

type Props = {
    chat: ChatTypes.Chat | BaseTypes.Empty;
    editChat: (data: { name: string | null; avatar: FormData | null }) => void;
} & BaseTypes.Statuses;

function EditGroupChatModal(props: Props) {
    const { chat, editChat } = props;

    const viewer = ViewerService.getViewer();

    const [error, setError] = useState('');

    const { open, files, formData } = useFileUploader({ accept: 'image', formDataName: 'images' });
    const search = useInput();
    const chatName = useInput();

    const onOk = (e: any) => {
        e.stopPropagation();
        setError('');
        editChat({ name: chatName.value || null, avatar: formData || null });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarAndName}>
                <div className={styles.avatar} onClick={open}>
                    {files.length ? <Avatar withHttp={false} img={`${http.url}${chat?.avatar}` || files[0].fileUrl} size={74} /> : <Icons variants="photo" />}
                </div>
                <div className={styles.name}>
                    <Input placeholder={chat?.name} {...chatName} width={220} title="Название группы" errorTitle={error} />
                </div>
            </div>
            <div className={styles.title}>Участники ({chat?.users?.length})</div>
            <div className={styles.list}>
                {chat?.chatUsers?.map((user) => (
                    <div key={user.id} className={styles.item}>
                        <UserCardView size="m" subtitle={UserService.getUserNetworkStatus(user) || ''} user={user} />
                    </div>
                ))}
            </div>
            <div className={styles.onOk} onClick={onOk}>
                dwd
            </div>
        </div>
    );
}

export default EditGroupChatModal;
