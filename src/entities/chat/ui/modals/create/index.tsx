import React, { useState } from 'react';

import { viewerTypes } from 'entities/viewer';
import { UseEasyStateReturnedType, UseArrayReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Card, Icons, Input, Title, Box } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../model/types';

type Props = {
    selectedUsers: UseArrayReturnedType<viewerTypes.Contact>;
    isGroup: UseEasyStateReturnedType<boolean>;
    createChat: (isGroup: boolean) => void;
    contacts: viewerTypes.Contact[] | BaseTypes.Empty;
} & BaseTypes.Statuses;

function CreateChatModalView(props: Props) {
    const { selectedUsers, isGroup, createChat, contacts, loading } = props;
    const [activeTab, setActiveTab] = useState(0);

    const btns = [{ id: 0, title: 'Все', onClick: () => setActiveTab(0) }];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">{isGroup.value ? 'Группа' : 'Написать сообщение'}</Title>
                <div className={styles.search}>
                    <Input width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
                <div className={styles.border} />
                <div className={styles.switch}>
                    <Button
                        onClick={isGroup.toggle}
                        width="auto"
                        variant="inherit"
                        active
                        prefixIcon={<Icons variant={isGroup.value ? 'contacts' : 'group'} />}
                    >
                        {isGroup.value ? 'Создать группу' : '  Создать личный чат'}
                    </Button>
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.nav}>
                    {btns.map((btn) => (
                        <Button key={btn.id} chips variant={btn.id === activeTab ? 'primary' : 'secondary'} onClick={btn.onClick}>
                            {btn.title}
                        </Button>
                    ))}
                </div>
                <div className={styles.list}>
                    {contacts?.map((contact) => (
                        <Card key={contact.id} title={contact.first_name || ''} subtitle={contact.phone || ''} />
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <Button prefixIcon={<Icons variant="new-message" />} variant="secondary" onClick={() => createChat(isGroup.value)}>
                    {!isGroup.value ? 'Создать группу' : '  Написать'}
                </Button>
            </div>
        </div>
    );
}

export default CreateChatModalView;
