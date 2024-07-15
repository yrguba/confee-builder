import React from 'react';

import { UseEasyStateReturnType, UseArrayReturnType, useEasyState, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse, Avatar, AvatarTypes, Box, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../../shared/lib';
import { CardListItem } from '../../../../../shared/ui/card/types';
import { DepartmentsThreeView } from '../../../../company';
import { EmployeeProxy } from '../../../../company/model/types';
import { ContactProxy, UseContactsReturnType } from '../../../../contact/model/types';

type Props = {
    selectedUsers: UseArrayReturnType<CardTypes.CardListItem>;
    isGroup: UseEasyStateReturnType<boolean>;
    createChat: () => void;
    tabsAndLists: UseContactsReturnType;
    avatarActions: AvatarTypes.AvatarChangeActions;
    chatName: InputTypes.UseReturnedType;
    avatar: string | null;
    chatDescription: UseEasyStateReturnType<string>;
} & BaseTypes.Statuses;

function CreateChatModalView(props: Props) {
    const { selectedUsers, chatDescription, avatar, chatName, avatarActions, isGroup, createChat, tabsAndLists, loading } = props;

    const finalStep = useEasyState(false);
    const { params, pathname } = useRouter();
    const toggle = () => {
        isGroup.toggle();
        selectedUsers.clear();
    };

    const isSearching = !!tabsAndLists.searchInput.value;
    const activeTabIsCompany = !!tabsAndLists.activeTab?.payload?.companyId;

    const updContacts = (contacts: ContactProxy[]): CardListItem[] => {
        return contacts?.map((i) => ({
            id: i.user.id,
            title: i.full_name,
            subtitle: i?.userProxy?.networkStatus || '',
            img: i.avatar,
        }));
    };

    const updEmployee = (employees: EmployeeProxy[]): CardListItem[] => {
        return employees?.map((i) => ({
            id: i.id,
            title: i.full_name,
            subtitle: i?.userProxy?.networkStatus || 'Не зарегестрирован',
            img: i.avatar,
        }));
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title animateTrigger={`${isGroup.value}`} variant="H2">
                    {isGroup.value ? 'Создать группу' : 'Написать сообщение'}
                </Title>
                {finalStep.value ? (
                    <div className={styles.chatInfo}>
                        <Box.Animated className={styles.groupSettings} visible={isGroup.value}>
                            <Avatar.Change photoIcon dropdownLeft={20} {...avatarActions} img={avatar} />
                            <div className={styles.name}>
                                <Input {...chatName} placeholder="Название" clearIcon maxLength={22} />
                            </div>
                        </Box.Animated>
                        {isGroup.value && (
                            <div className={styles.description}>
                                <Input.Textarea
                                    maxLength={500}
                                    textChange={(text) => chatDescription.set(text)}
                                    value={chatDescription.value}
                                    focusTrigger={[]}
                                    placeholder="Описание"
                                    height="100%"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className={styles.switch}>
                            <Button
                                onClick={toggle}
                                width="auto"
                                height="38px"
                                variant="inherit"
                                active
                                animateTrigger={`${isGroup.value}`}
                                prefixIcon={<Icons variant={isGroup.value ? 'create-personal' : 'create-group'} />}
                            >
                                {!isGroup.value ? 'Создать группу' : 'Написать сообщение'}
                            </Button>
                        </div>
                        <div className={styles.search}>
                            <Input {...tabsAndLists.searchInput} width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                        </div>
                    </>
                )}
            </div>
            {!finalStep.value && selectedUsers.length && isGroup.value ? (
                <div className={styles.selected}>
                    {selectedUsers.array.map((i) => (
                        <div className={styles.item} key={i.id}>
                            {i.title}
                            <span className={styles.icon} onClick={() => selectedUsers.deleteById(i.id)}>
                                <Icons variant="close" size={16} />
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}
            {!finalStep.value && (
                <div className={styles.tabBar}>
                    <TabBar bodyStyle={{ padding: '0 22px' }} items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} />
                </div>
            )}
            <div className={styles.list}>
                {finalStep.value ? (
                    <Card.List items={selectedUsers.array} />
                ) : (
                    <>
                        {isSearching && activeTabIsCompany && !tabsAndLists.employees.length && (
                            <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} />
                        )}
                        {isSearching && !activeTabIsCompany && !tabsAndLists.contacts.length && (
                            <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} />
                        )}
                        {isSearching && activeTabIsCompany && <Card.List selected={selectedUsers} items={updEmployee(tabsAndLists.employees)} />}
                        {!activeTabIsCompany && <Card.List selected={selectedUsers} items={updContacts(tabsAndLists.contacts)} />}
                        {!isSearching && (
                            <DepartmentsThreeView
                                departments={tabsAndLists.departments}
                                tabsAndLists={tabsAndLists}
                                params={params}
                                activeUserId={null}
                                updEmployee={updEmployee}
                            />
                        )}
                    </>
                )}
            </div>
            <div className={styles.footer}>
                <Button
                    animateTrigger={`${isGroup.value}`}
                    // prefixIcon={!isGroup.value ? <Icons variant="new-message" /> : null}
                    variant="primary"
                    onClick={isGroup.value ? () => (finalStep.value ? createChat() : finalStep.set(true)) : createChat}
                    disabled={!selectedUsers.length}
                >
                    {isGroup.value ? (finalStep.value ? 'Создать' : 'Далее') : '  Написать'}
                </Button>
                {finalStep.value && (
                    <Button
                        animateTrigger={`${isGroup.value}`}
                        variant="secondary"
                        onClick={() => {
                            finalStep.set(false);
                            chatName.clear();
                            chatDescription.set('');
                        }}
                    >
                        Назад
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CreateChatModalView;
