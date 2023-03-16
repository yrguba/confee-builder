import React from 'react';

import { baseTypes } from 'shared/types';
import { Box, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { userTypes, UserCardView } from '../..';

type Props = {
    list: userTypes.User[] | baseTypes.Empty;
    departmentClick: (arg: any) => void;
    divisionClick: (arg: any) => void;
    userClick: (arg: any) => void;
} & baseTypes.Statuses;

function DepartmentsListView(props: Props) {
    const { list, loading, error, departmentClick, divisionClick, userClick } = props;

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
        <Box loading={loading} className={styles.list}>
            {list &&
                data.map((department, index: number) => (
                    <Collapse
                        key={department.id}
                        openByClickingOnArrow
                        titleClassName={styles.departmentTitle}
                        title={department.name}
                        onTitleClick={departmentClick}
                    >
                        {department.items.map((division) => (
                            <Collapse
                                key={division.id}
                                openByClickingOnArrow
                                titleClassName={styles.divisionTitle}
                                title={division.name}
                                onTitleClick={() => divisionClick({ department: department.name, division: division.name })}
                            >
                                <div className={styles.usersList}>
                                    {division?.users &&
                                        division?.users.map((user: any) => (
                                            <UserCardView
                                                key={user.id}
                                                user={user}
                                                onClick={() => userClick({ department: department.name, division: division.name, user })}
                                            />
                                        ))}
                                </div>
                            </Collapse>
                        ))}
                    </Collapse>
                ))}
        </Box>
    );
}

export default DepartmentsListView;
