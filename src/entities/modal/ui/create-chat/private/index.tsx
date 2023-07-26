import React, { useEffect, useState } from 'react';

import { UserCardView, UserTypes } from 'entities/user';
import { useInput } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Input } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    userClick: (user: UserTypes.User) => void;
    users: UserTypes.User[];
} & BaseTypes.Statuses;

function CreatePrivateChatModal(props: Props) {
    const { userClick, users } = props;

    const [usersList, setUsersList] = useState(users);

    const search = useInput();

    useEffect(() => {
        setUsersList(users.filter((user) => user.first_name.toLowerCase().includes(search.value.toLowerCase())));
    }, [search.value]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Контакты ({users.length})</div>
            <div className={styles.search}>
                <Input width="100%" {...search} placeholder="Поиск" />
            </div>
            <div className={styles.list}>
                {usersList.map((user) => (
                    <UserCardView key={user.id} onClick={userClick} user={user} />
                ))}
            </div>
        </div>
    );
}

export default CreatePrivateChatModal;
