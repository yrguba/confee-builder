import React, { forwardRef, Fragment, memo, useEffect } from 'react';

import { useArray, useEasyState, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Card, Collapse, TabBar, Input } from 'shared/ui';

import styles from './styles.module.scss';
import { CardListItem } from '../../../../shared/ui/card/types';
import { DepartmentsThreeView } from '../../../company';
import { EmployeeProxy } from '../../../company/model/types';
import { ContactProxy, Actions, UseContactsReturnType } from '../../model/types';

type Props = {
    clickContact: (user: ContactProxy) => void;
    clickEmployee: (user: EmployeeProxy) => void;
    activeUserId: number | null;
    actions: (data?: { action: Actions; contact: ContactProxy | null; employee: EmployeeProxy | null }) => void;
    tabsAndLists: UseContactsReturnType;
} & BaseTypes.Statuses;

function ContactsListView(props: Props) {
    const { activeUserId, clickContact, clickEmployee, actions, tabsAndLists, loading } = props;
    const { params, pathname } = useRouter();

    const isSearching = !!tabsAndLists.searchInput.value;
    const activeTabIsCompany = !!tabsAndLists.activeTab?.payload?.companyId;

    const updContacts = (contacts: ContactProxy[]): CardListItem[] => {
        return contacts.map((i) => ({
            id: i.id,
            title: i.full_name,
            subtitle: i?.userProxy?.networkStatus || '',
            img: i.avatar,
            onClick: () => clickContact(i),
        }));
    };

    const updEmployee = (employees: EmployeeProxy[]): CardListItem[] => {
        return employees?.map((i) => ({
            id: i.id,
            title: i.full_name,
            // subtitle: i?.userProxy?.networkStatus || 'Не зарегестрирован',
            subtitle: i.position || 'Не зарегестрирован',
            img: i.avatar,
            onClick: () => clickEmployee(i),
        }));
    };

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            <div className={styles.search}>
                <Input {...tabsAndLists.searchInput} prefixIcon="search" />
            </div>
            <div className={styles.tabs}>
                <TabBar items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} />
            </div>
            <Box.Animated visible key={pathname.split('/')[2]} className={styles.list}>
                {isSearching && activeTabIsCompany && !tabsAndLists.employees.length && (
                    <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} />
                )}
                {isSearching && !activeTabIsCompany && !tabsAndLists.contacts.length && (
                    <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} />
                )}
                {isSearching && activeTabIsCompany && <Card.List activeItem={activeUserId} items={updEmployee(tabsAndLists.employees)} />}
                {!activeTabIsCompany && <Card.List activeItem={activeUserId} items={updContacts(tabsAndLists.contacts)} />}
                {!isSearching && activeTabIsCompany && (
                    <DepartmentsThreeView
                        departments={tabsAndLists.departments}
                        tabsAndLists={tabsAndLists}
                        params={params}
                        activeUserId={activeUserId}
                        updEmployee={updEmployee}
                    />
                )}
            </Box.Animated>
        </Box.Animated>
    );
}

export default ContactsListView;
