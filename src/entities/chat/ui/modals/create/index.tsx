import React from 'react';

import { UseEasyStateReturnType, UseArrayReturnType, useEasyState } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse, Avatar, AvatarTypes, Box, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { CardListItem } from '../../../../../shared/ui/card/types';
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

    const toggle = () => {
        isGroup.toggle();
        selectedUsers.clear();
    };

    const isSearching = !!tabsAndLists.searchInput.value;
    const activeTabIsCompany = !!tabsAndLists.activeTab?.payload?.companyId;

    const updContacts = (contacts: ContactProxy[]): CardListItem[] => {
        return contacts.map((i) => ({
            id: i.user.id,
            title: i.full_name,
            subtitle: i?.userProxy?.networkStatus || '',
            img: i.avatar,
        }));
    };

    const updEmployee = (employees: EmployeeProxy[]): CardListItem[] => {
        return employees.map((i) => ({
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
                            <Input {...chatName} placeholder="Введите название" clearIcon maxLength={22} />
                        </Box.Animated>
                        {isGroup.value && (
                            <div className={styles.description}>
                                <Input.Textarea
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
                                variant="inherit"
                                active
                                animateTrigger={`${isGroup.value}`}
                                prefixIcon={<Icons variant={isGroup.value ? 'personal-acc' : 'contacts'} />}
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
            {!finalStep.value && <TabBar bodyStyle={{ padding: '0 22px' }} items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} />}
            <div className={styles.list}>
                {finalStep.value ? (
                    <Card.List items={selectedUsers.array} />
                ) : (
                    <>
                        {isSearching && activeTabIsCompany && !tabsAndLists.employees.length && <Icons.Picture variant="not-found" size={233} />}
                        {isSearching && !activeTabIsCompany && !tabsAndLists.contacts.length && <Icons.Picture variant="not-found" size={233} />}
                        {isSearching && activeTabIsCompany && <Card.List selected={selectedUsers} items={updEmployee(tabsAndLists.employees)} />}
                        {!activeTabIsCompany && <Card.List selected={selectedUsers} items={updContacts(tabsAndLists.contacts)} />}
                        {!isSearching &&
                            activeTabIsCompany &&
                            tabsAndLists.departments?.map((dep) => (
                                <Collapse
                                    headerStyle={{ padding: '0 12px', width: 'calc(100% - 24px)' }}
                                    openClose={(value) => value && tabsAndLists.getEmployees(dep.id)}
                                    key={dep.id}
                                    title={dep?.name || ''}
                                >
                                    <Card.List
                                        selected={selectedUsers}
                                        visibleLastItem={() => tabsAndLists.getNextPage('employee')}
                                        items={updEmployee(tabsAndLists.employees)}
                                    />
                                </Collapse>
                            ))}
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
