import React from 'react';

import { UseEasyStateReturnType, UseArrayReturnType, useEasyState } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse, Avatar, AvatarTypes, Box, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../../shared/lib';
import { CardListItem } from '../../../../../shared/ui/card/types';
import { EmployeeProxy } from '../../../../company/model/types';
import { ContactProxy, UseContactsReturnType } from '../../../../contact/model/types';

type Props = {
    selectedUsers: UseArrayReturnType<CardTypes.CardListItem>;
    createMeet: () => void;
    tabsAndLists: UseContactsReturnType;
} & BaseTypes.Statuses;

function CreateMeetModalView(props: Props) {
    const { selectedUsers, tabsAndLists, loading, createMeet } = props;

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
                <Title variant="H2">Начать звонок</Title>
                <div className={styles.search}>
                    <Input {...tabsAndLists.searchInput} width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
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

                <TabBar bodyStyle={{ padding: '0 22px' }} items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} />
            </div>

            <div className={styles.list}>
                {isSearching && activeTabIsCompany && !tabsAndLists.employees.length && (
                    <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} />
                )}
                {isSearching && !activeTabIsCompany && !tabsAndLists.contacts.length && (
                    <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} />
                )}
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
                            // subtitle={getEnding()}
                        >
                            <Card.List
                                companyNames={[tabsAndLists.activeTab?.title || '']}
                                selected={selectedUsers}
                                visibleLastItem={() => tabsAndLists.getNextPage('employee')}
                                items={updEmployee(tabsAndLists.departmentsEmployees[dep.id])}
                            />
                        </Collapse>
                    ))}
            </div>
            <div className={styles.footer}>
                <Button variant="primary" onClick={createMeet} disabled={!selectedUsers.length}>
                    Далее
                </Button>
            </div>
        </div>
    );
}

export default CreateMeetModalView;
