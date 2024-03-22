import React from 'react';

import { UseEasyStateReturnType, UseArrayReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { CardListItem } from '../../../../../shared/ui/card/types';
import { employeeProxy } from '../../../../company';
import { EmployeeProxy } from '../../../../company/model/types';
import contactProxy from '../../../../contact/lib/proxy';
import { ContactProxy, UseContactsReturnType } from '../../../../contact/model/types';
import { ChatProxy } from '../../../model/types';

type Props = {
    selectedUsers: UseArrayReturnType<CardTypes.CardListItem>;
    chat: ChatProxy | BaseTypes.Empty;
    add: () => void;
    tabsAndLists: UseContactsReturnType;
} & BaseTypes.Statuses;

function AddMembersInChatModalView(props: Props) {
    const { chat, selectedUsers, add, tabsAndLists, loading } = props;

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
                <Title variant="H2">Добавить участников</Title>
                <div className={styles.search}>
                    <Input {...tabsAndLists.searchInput} width="100%" placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
                <div className={styles.border} />
            </div>
            <div className={styles.list}>
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
            </div>
            <div className={styles.footer}>
                <Button variant="secondary" onClick={add}>
                    Добавить
                </Button>
            </div>
        </div>
    );
}

export default AddMembersInChatModalView;
