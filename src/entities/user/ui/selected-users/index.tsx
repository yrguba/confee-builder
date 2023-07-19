import React from 'react';

import { useEnding, useRowAndDropdown } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Collapse, Avatar, Icons, Button, Navbar } from 'shared/ui';

import styles from './styles.module.scss';
import { http } from '../../../../shared/constanst';
import { User } from '../../model/types';

type Props = {
    users: User[];
    deleteUser: (arg: User) => void;
    clearSelectedUsers: () => void;
} & BaseTypes.Statuses;

function SelectedUsersView(props: Props) {
    const { users, deleteUser, clearSelectedUsers } = props;

    const word = useEnding(users.length, ['человек', 'человека', 'человек']);

    const items: any[] = [
        { id: 0, text: 'Написать сообщение выбранным', path: 'company', breakpoint: 0 },
        { id: 1, text: 'Создать конференцию для выбранных', path: 'chats', breakpoint: 1200 },
        { id: 2, text: 'Очистить', path: 'tasks', breakpoint: 1265, onClick: clearSelectedUsers },
    ];
    const { itemsInRow, itemsInDropdown } = useRowAndDropdown<any>(items);
    const item = (item: any) => (
        <Button
            active={item.id === 1}
            style={{ height: 40 }}
            error={item.id === 2}
            key={item.id}
            onClick={item.onClick}
            // onClick={() => startTransition(() => navigate(item.path))}
        >
            {item.text}
        </Button>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.counter}>{`Выбранно ${users.length} ${word}`}</div>
                <div className={styles.buttons}>
                    <Navbar.Responsive
                        dropDownProps={{ position: 'left-bottom' }}
                        btnRadius={40}
                        itemsInDropdown={itemsInDropdown}
                        itemsInRow={itemsInRow}
                        item={item}
                    />
                </div>
            </div>
            <div className={styles.list}>
                {users.map((user) => (
                    <div key={user.id} className={styles.item}>
                        <div className={styles.userInfo}>
                            <Avatar img={user.avatars[0]} name={user.first_name} />
                            {user.first_name}
                        </div>
                        <div className={styles.delete} onClick={() => deleteUser(user)}>
                            <Icons variants="exit" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectedUsersView;
