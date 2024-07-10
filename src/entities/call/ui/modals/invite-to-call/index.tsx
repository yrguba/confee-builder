import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { UseArrayReturnType } from '../../../../../shared/hooks';
import { contactProxy } from '../../../../contact';
import { Contact, ContactProxy } from '../../../../contact/model/types';
import { userProxy } from '../../../../user';
import { User, UserProxy } from '../../../../user/model/types';

type Props = {
    sendInvites: () => void;
    users?: User[];
    selectedUsers: UseArrayReturnType<CardTypes.CardListItem>;
} & BaseTypes.Statuses;

function InviteToCallModalView(props: Props) {
    const { selectedUsers, users, sendInvites } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Отправить приглашение</Title>
                <div className={styles.border} />
            </div>
            <div className={styles.list}>
                <Card.List
                    selected={selectedUsers}
                    items={users?.map((i) => {
                        const proxy = userProxy(i);
                        return {
                            name: proxy?.full_name || '',
                            id: proxy?.id || '',
                            img: proxy?.avatar || '',
                            title: proxy?.full_name || '',
                            subtitle: proxy?.phone || '',
                        };
                    })}
                />
            </div>
            <div className={styles.footer}>
                <Button disabled={!selectedUsers.array.length} variant="secondary" onClick={sendInvites}>
                    Отправить
                </Button>
            </div>
        </div>
    );
}

export default InviteToCallModalView;
