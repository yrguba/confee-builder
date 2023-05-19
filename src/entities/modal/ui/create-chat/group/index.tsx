import React, { useEffect, useState } from 'react';

import { UserCardView, UserTypes } from 'entities/user';
import { useInput, useArray, useFileUploader } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input, Icons, Avatar } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    users: UserTypes.User[];
    createChat: (data: { name: string; avatar: FormData | null; users: number[] }) => void;
} & BaseTypes.Statuses;

function CreateGroupChatModal(props: Props) {
    const { users, createChat } = props;

    const [usersList, setUsersList] = useState(users);

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

    const onOk = (e: any) => {
        e.stopPropagation();
        createChat({ name: chatName.value, users: selectedUsers.map((i) => i.id), avatar: formData || null });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarAndName}>
                <div className={styles.avatar} onClick={open}>
                    {files.length ? <Avatar withHttp={false} img={files[0].fileUrl} size={74} /> : <Icons variants="photo" />}
                </div>
                <div className={styles.name}>
                    <div className={styles.text}>Название группы</div>
                    <Input {...chatName} width={220} />
                </div>
            </div>
            <div className={styles.title}>
                Участники ({selectedUsers.length}/{users.length})
            </div>
            <div className={styles.search}>
                <Input.Search {...search} placeholder="Поиск" size="xxl" />
            </div>
            <div className={styles.list}>
                {usersList.map((user) => (
                    <div key={user.id} className={`${styles.item} ${selectedUsers.find((i) => i.id === user.id) && styles.item_active}`}>
                        <UserCardView onClick={cardClick} user={user} />
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
