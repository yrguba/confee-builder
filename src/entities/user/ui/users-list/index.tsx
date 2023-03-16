import React from 'react';

import { baseTypes } from 'shared/types';
import { Button, Pagination, PaginationTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { User } from '../../model/types';
import UserCardView from '../card';

type Props = {
    users: User[] | baseTypes.Empty;
    pageClick: PaginationTypes.PageClick;
} & baseTypes.Statuses;

function UsersListView(props: Props) {
    const { users, pageClick } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.content}>
                    <div className={styles.usersColumn}>Сотрудники отдела</div>
                    <div className={styles.roleColumn}>Должность</div>
                    <div className={styles.statusesColumn}>Статусы</div>
                    <div className={styles.btnColumn}>
                        <Button size="m">Выбрать</Button>
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                {users &&
                    users.map((user) => (
                        <div key={user.id} className={styles.item}>
                            <div className={styles.content}>
                                <div className={styles.usersColumn}>
                                    <UserCardView user={user} size="m" />
                                </div>
                                <div className={styles.roleColumn}>разраб</div>
                                <div className={styles.statusesColumn}>статусы</div>
                                <div className={styles.btnColumn}>
                                    <Button size="m">Выбрать</Button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className={styles.pagination}>
                <Pagination pageCount={70} pageClick={pageClick} />
            </div>
        </div>
    );
}

export default UsersListView;
