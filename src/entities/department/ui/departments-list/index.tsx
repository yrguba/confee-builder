import React from 'react';
import { useParams } from 'react-router';

import { BaseTypes } from 'shared/types';
import { Box, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { User } from '../../../user/model/types';
import UserCardView from '../../../user/ui/card';

type Props = {
    list: User[] | BaseTypes.Empty;
    departmentClick: (arg: any) => void;
    divisionClick: (arg: any) => void;
    userClick: (arg: any) => void;
} & BaseTypes.Statuses;

function DepartmentsListView(props: Props) {
    const { list, loading, error, departmentClick, divisionClick, userClick } = props;

    const params = useParams();

    const otdel = [
        { id: 0, name: 'otdel1', users: list },
        { id: 1, name: 'otdel2', users: list },
        { id: 2, name: 'otdel3', users: list },
    ];

    const data = [
        { id: 0, name: 'departamentwdwadawdadawdawd1', items: otdel },
        { id: 1, name: 'departament2', items: otdel },
        { id: 2, name: 'departament3', items: otdel },
    ];

    return (
        <Box loading={loading} className={styles.wrapper}>
            {list &&
                data.map((department, index: number) => (
                    <Collapse
                        key={department.id}
                        openByClickingOnArrow
                        titleClassName={styles.departmentTitle}
                        headerClassName={params?.department_name === department.name ? styles.select : ''}
                        title={department.name}
                        onTitleClick={departmentClick}
                    >
                        {department.items.map((division) => (
                            <Collapse
                                key={division.id}
                                openByClickingOnArrow
                                titleClassName={styles.divisionTitle}
                                headerClassName={params?.division_name === division.name ? styles.select : ''}
                                title={division.name}
                                onTitleClick={() => divisionClick({ department: department.name, division: division.name })}
                            >
                                <div className={styles.usersList}>
                                    {division?.users &&
                                        division?.users.map(
                                            (user: any) =>
                                                user.name && (
                                                    <div
                                                        key={user.id}
                                                        className={`${styles.cardWrapper} ${
                                                            Number(params?.user_id) === user.id ? styles.cardWrapper_active : ''
                                                        }`}
                                                    >
                                                        <div className={styles.cardBody}>
                                                            <UserCardView
                                                                user={user}
                                                                onClick={() => userClick({ department: department.name, division: division.name, user })}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                </div>
                            </Collapse>
                        ))}
                    </Collapse>
                ))}
        </Box>
    );
}

export default DepartmentsListView;
