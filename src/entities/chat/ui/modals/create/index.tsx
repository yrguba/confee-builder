import React, { useState } from 'react';

import { viewerTypes } from 'entities/viewer';
import { UseEasyStateReturnedType, UseArrayReturnedType } from 'shared/hooks';
import { generateItems } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Button, Card, Icons, Input, Title, Box, TabBar } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    selectedUsers: UseArrayReturnedType<viewerTypes.Contact>;
    isGroup: UseEasyStateReturnedType<boolean>;
    createChat: (isGroup: boolean) => void;
    contacts: viewerTypes.Contact[] | BaseTypes.Empty;
} & BaseTypes.Statuses;

function CreateChatModalView(props: Props) {
    const { selectedUsers, isGroup, createChat, contacts, loading } = props;
    const [activeTab, setActiveTab] = useState(0);

    const b = [{ id: 0, title: 'Все', callback: () => setActiveTab(0) }];
    const btns: any = generateItems(b, 20);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title animateTrigger={`${isGroup.value}`} variant="H2">
                    {isGroup.value ? 'Группа' : 'Написать сообщение'}
                </Title>
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
                        animateTrigger={`${isGroup.value}`}
                        prefixIcon={<Icons variant={isGroup.value ? 'contacts' : 'group'} />}
                    >
                        {isGroup.value ? 'Создать группу' : '  Создать личный чат'}
                    </Button>
                </div>
            </div>
            <TabBar bodyStyle={{ padding: '0 22px' }} items={btns} activeItemId={activeTab} />
            <div className={styles.body}>
                <div className={styles.list}>
                    {contacts?.map((contact) => (
                        <Card key={contact.id} title={contact.first_name || ''} subtitle={contact.phone || ''} />
                    ))}
                </div>
            </div>
            <div className={styles.footer}>
                <Button
                    animateTrigger={`${isGroup.value}`}
                    prefixIcon={<Icons variant="new-message" />}
                    variant="secondary"
                    onClick={() => createChat(isGroup.value)}
                >
                    {!isGroup.value ? 'Создать группу' : '  Написать'}
                </Button>
            </div>
        </div>
    );
}

export default CreateChatModalView;
