import React from 'react';

import { UseEasyStateReturnType, UseArrayReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse, Avatar, AvatarTypes, Box, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { employeeProxy } from '../../../../company';
import contactProxy from '../../../../contact/lib/proxy';
import { ContactProxy, UseContactsTabsAndListsReturnType } from '../../../../contact/model/types';

type Props = {
    selectedContacts: UseArrayReturnType<CardTypes.CardListItem>;
    selectedEmployees: UseArrayReturnType<CardTypes.CardListItem>;
    isGroup: UseEasyStateReturnType<boolean>;
    createChat: () => void;
    tabsAndLists: UseContactsTabsAndListsReturnType;
    avatarActions: AvatarTypes.AvatarChangeActions;
    chatName: InputTypes.UseReturnedType;
    avatar: string | null;
} & BaseTypes.Statuses;

function CreateChatModalView(props: Props) {
    const { avatar, chatName, avatarActions, selectedContacts, selectedEmployees, isGroup, createChat, tabsAndLists, loading } = props;

    const contactsArr = tabsAndLists?.searchInput.value ? tabsAndLists.foundContacts : tabsAndLists.activeList;

    const toggle = () => {
        isGroup.toggle();
        selectedContacts.clear();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title animateTrigger={`${isGroup.value}`} variant="H2">
                    {isGroup.value ? 'Группа' : 'Написать сообщение'}
                </Title>
                <Box.Animated className={styles.groupSettings} visible={isGroup.value}>
                    <Avatar.Change dropdownLeft={20} {...avatarActions} img={avatar} />
                    <Input {...chatName} placeholder="Введите название" clearIcon maxLength={22} />
                </Box.Animated>
                <div className={styles.search}>
                    <Input {...tabsAndLists.searchInput} width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
                {/* <div className={styles.border} /> */}
                <div className={styles.switch}>
                    <Button
                        onClick={toggle}
                        width="auto"
                        variant="inherit"
                        active
                        animateTrigger={`${isGroup.value}`}
                        prefixIcon={<Icons variant={isGroup.value ? 'personal-acc' : 'contacts'} />}
                    >
                        {!isGroup.value ? 'Создать группу' : 'Написать личное сообщение'}
                    </Button>
                </div>
            </div>
            <TabBar
                bodyStyle={{ padding: '0 22px' }}
                clickTab={(tab) => tabsAndLists.setActiveTab(tab)}
                items={tabsAndLists.tabs}
                activeItemId={tabsAndLists.activeTab?.id}
            />
            <div className={styles.list}>
                {tabsAndLists.activeTab?.title === 'Личные' ? (
                    <Card.List
                        sortByName
                        selected={selectedContacts}
                        items={contactsArr?.map((i: any) => {
                            const contact: ContactProxy = contactProxy(i);
                            return {
                                id: contact?.id || '',
                                img: contact?.avatar || '',
                                name: contact?.full_name || '',
                                title: contact?.full_name || '',
                                subtitle: contact?.phone || '',
                                payload: { id: contact.user?.id },
                            };
                        })}
                    />
                ) : tabsAndLists.searchInput.value ? (
                    <Card.List
                        visibleLastItem={(value) => value && tabsAndLists.getNextPageEmployees()}
                        selected={selectedEmployees}
                        items={tabsAndLists.foundEmployees?.map((i: any) => {
                            const employee = employeeProxy(i);
                            return {
                                id: employee?.id || '',
                                img: employee?.avatar || '',
                                name: employee?.full_name || '',
                                title: employee?.full_name || '',
                                subtitle: employee?.email || '',
                                payload: { id: employee?.id },
                            } as any;
                        })}
                    />
                ) : (
                    tabsAndLists.activeList?.map((dep: any) => (
                        <Collapse loading={tabsAndLists.loading} onTitleClick={() => tabsAndLists.getEmployees(dep.id)} key={dep.id} title={dep?.name || ''}>
                            <Card.List
                                visibleLastItem={(value) => value && tabsAndLists.getNextPageEmployees()}
                                selected={selectedEmployees}
                                items={tabsAndLists.departmentsEmployees[dep.id]?.map((i: any) => {
                                    const employee = employeeProxy(i);
                                    return {
                                        id: employee?.id || '',
                                        img: employee?.avatar || '',
                                        name: employee?.full_name || '',
                                        title: employee?.full_name || '',
                                        subtitle: employee?.email || '',
                                        payload: { id: employee?.id },
                                    } as any;
                                })}
                            />
                        </Collapse>
                    ))
                )}
            </div>
            <div className={styles.footer}>
                <Button animateTrigger={`${isGroup.value}`} prefixIcon={<Icons variant="new-message" />} variant="secondary" onClick={createChat}>
                    {isGroup.value ? 'Создать группу' : '  Написать'}
                </Button>
            </div>
        </div>
    );
}

export default CreateChatModalView;
