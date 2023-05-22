import React, { useEffect, useState } from 'react';

import { UserCardView, UserTypes, UserService } from 'entities/user';
import { ViewerService } from 'entities/viewer';
import { useInput, useArray, useFileUploader } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Icons, Avatar } from 'shared/ui';

import styles from './styles.module.scss';
import { name } from '../../../../../shared/constanst/project-info';

type Props = {
    users: UserTypes.User[];
    createChat: (data: { name: string; avatar: FormData | null; users: number[] }) => void;
} & BaseTypes.Statuses;

function CreateGroupChatModal(props: Props) {
    const { users, createChat } = props;

    const viewer = ViewerService.getViewer();

    const [usersList, setUsersList] = useState(users);
    const [error, setError] = useState('');

    const { open, files, formData } = useFileUploader({ accept: 'image', formDataName: 'images' });
    const search = useInput();
    const chatName = useInput();
    const { push, arr: selectedUsers } = useArray({ multiple: true, selfDestruction: true });

    useEffect(() => {
        setUsersList(users.filter((user) => user.name.toLowerCase().includes(search.value.toLowerCase())));
    }, [search.value]);

    const cardClick = (user: UserTypes.User) => {
        push(user);
        // userClick(user);
    };

    const user_ids = selectedUsers.map((i) => i.id);

    const onOk = (e: any) => {
        e.stopPropagation();
        setError('');
        if (!chatName.value) return setError('Введите название группы');
        // if (!selectedUsers.length) return setError('Введите название группы');
        createChat({ name: chatName.value, users: user_ids.length ? user_ids : viewer?.id ? [viewer?.id] : [], avatar: formData || null });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarAndName}>
                <div className={styles.avatar} onClick={open}>
                    {files.length ? <Avatar withHttp={false} img={files[0].fileUrl} size={74} /> : <Icons variants="photo" />}
                </div>
                <div className={styles.name}>
                    <Input {...chatName} width={220} title="Название группы" errorTitle={error} />
                </div>
            </div>
            <div className={styles.title}>
                Участники ({selectedUsers.length}/{users.length})
            </div>
            <div className={styles.search}>
                <Input.Search width="100%" {...search} placeholder="Поиск" />
            </div>
            <div className={styles.list}>
                {usersList.map((user) => (
                    <div key={user.id} className={`${styles.item} ${selectedUsers.find((i) => i.id === user.id) && styles.item_active}`}>
                        <UserCardView size="m" subtitle={UserService.getUserNetworkStatus(user) || ''} onClick={cardClick} user={user} />
                    </div>
                ))}
            </div>
            <div className={styles.onOk} onClick={onOk}>
                dwd
            </div>
        </div>
    );
}

export default CreateGroupChatModal;
