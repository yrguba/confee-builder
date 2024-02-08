import React, { useEffect } from 'react';

import { employeeProxy } from 'entities/company';
import { messageTypes } from 'entities/message';
import { useArray, useEasyState, UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Button, TabBar, Card, Image, Document, Audio, Video, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { EmployeeProxy } from '../../../../../../company/model/types';
import { UserProxy } from '../../../../../../user/model/types';

type Props = {
    members: UserProxy[] | BaseTypes.Empty;
    employeeMembers: EmployeeProxy[] | BaseTypes.Empty;
    visibleAddContact: boolean;
    addMemberClick?: () => void;
    removeMember?: (id: number, name: string) => void;
    clickUser?: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
    isOwner: boolean;
} & BaseTypes.Statuses;

type Member = {
    id: number;
    name: string;
    description: string;
    avatar: string;
};

function Members(props: Props) {
    const { isOwner, members, employeeMembers, visibleAddContact, addMemberClick, removeMember, clickUser } = props;

    const admins = useEasyState<Member[]>([]);
    const withoutRights = useEasyState<Member[]>([]);

    useEffect(() => {
        const current = members?.length ? members : employeeMembers;
        const initAdmins: Member[] = [];
        const initMembers: Member[] = [];
        console.log(current);
        current?.map((i: any) => {
            const obj = {
                id: i.id,
                name: i.full_name || '',
                avatar: i.avatar || '',
                description: i?.networkStatus || i.status || '',
            };
            if (i.role === 'Owner') {
                initAdmins.push(obj);
            }
            if (i.role === 'Chat member') {
                initMembers.push(obj);
            }
        });
        admins.set(initAdmins);
        withoutRights.set(initMembers);
    }, [members, employeeMembers]);

    return (
        <div className={styles.wrapper}>
            {visibleAddContact && (
                <div className={styles.addMembers} onClick={addMemberClick}>
                    <Icons variant="add-contact" />
                    <Title active variant="H3M">
                        Добавить участников
                    </Title>
                </div>
            )}
            {admins.value?.length ? (
                <div className={styles.list}>
                    <Title textAlign="right" color="inactive" variant="H4M">
                        владелец
                    </Title>
                    {admins.value.map((i) => (
                        <div key={i.id} className={styles.item}>
                            <Card title={i.name} img={i.avatar} subtitle={i.description} />
                        </div>
                    ))}
                </div>
            ) : null}
            <div className={styles.list}>
                <Title textAlign="right" color="inactive" variant="H4M">
                    участники
                </Title>
                {withoutRights.value.map((i) => (
                    <div key={i.id} className={styles.item}>
                        <Card title={i.name} img={i.avatar} subtitle={i.description} />
                        {isOwner && (
                            <Button.Circle variant="inherit" onClick={() => removeMember && removeMember(i.id, i.name)}>
                                <Icons variant="delete" />
                            </Button.Circle>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Members;
