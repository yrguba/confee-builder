import React, { useState } from 'react';

import { contactTypes } from 'entities/contact';
import { UseEasyStateReturnType, UseArrayReturnType, useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, IconsTypes, Dropdown, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { employeeProxy } from '../../../../company';
import { Department, EmployeeProxy } from '../../../../company/model/types';
import contactProxy from '../../../../contact/lib/proxy';
import { Actions, ContactProxy, UseContactsTabsAndListsReturnType } from '../../../../contact/model/types';

type Props = {
    selectedContacts: UseArrayReturnType<CardTypes.CardListItem>;
    selectedEmployees: UseArrayReturnType<CardTypes.CardListItem>;
    isGroup: UseEasyStateReturnType<boolean>;
    createChat: () => void;
    tabsAndLists: UseContactsTabsAndListsReturnType;
} & BaseTypes.Statuses;

function CreateChatModalView(props: Props) {
    const { selectedContacts, selectedEmployees, isGroup, createChat, tabsAndLists, loading } = props;

    const toggle = () => {
        isGroup.toggle();
        selectedContacts.clear();
    };
    console.log(tabsAndLists);
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
                        onClick={toggle}
                        width="auto"
                        variant="inherit"
                        active
                        animateTrigger={`${isGroup.value}`}
                        prefixIcon={<Icons variant={isGroup.value ? 'contacts' : 'group'} />}
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
                {tabsAndLists.activeTab?.title === 'личные' ? (
                    <Card.List
                        sortByName
                        selected={selectedContacts}
                        items={tabsAndLists.activeList?.map((i: any) => {
                            const contact: ContactProxy = contactProxy(i);
                            return {
                                id: contact.id || new Date().valueOf(),
                                img: '',
                                name: contact?.full_name || '',
                                title: contact?.full_name || '',
                                subtitle: contact?.phone || '',
                                payload: { id: contact.user_id },
                            };
                        })}
                    />
                ) : (
                    tabsAndLists.activeList?.map((i: any) =>
                        i?.departments?.map((dep: Department) => (
                            <Collapse
                                loading={tabsAndLists.loading}
                                onTitleClick={() => tabsAndLists.getEmployees(dep.id)}
                                key={dep.id}
                                title={dep?.name || ''}
                            >
                                <Card.List
                                    visibleLastItem={(value) => value && tabsAndLists.getNextPageEmployees()}
                                    selected={selectedEmployees}
                                    items={tabsAndLists.departmentsEmployees[dep.id]?.map((i: any) => {
                                        const employee: EmployeeProxy = employeeProxy(i);
                                        return {
                                            id: employee.id,
                                            img: employee.avatar,
                                            name: employee?.full_name || '',
                                            title: employee?.full_name || '',
                                            subtitle: employee?.email || '',
                                            payload: { id: employee.id },
                                        };
                                    })}
                                />
                            </Collapse>
                        ))
                    )
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
