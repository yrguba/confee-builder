import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { UseArrayReturnType } from '../../../../../../shared/hooks';
import { Box, Card, CardTypes, Icons } from '../../../../../../shared/ui';
import { EmployeeProxy } from '../../../../../company/model/types';
import contactProxy from '../../../../../contact/lib/proxy';
import { ContactProxy, UseContactsTabsAndListsReturnType } from '../../../../../contact/model/types';

type Props = {
    tabsAndLists: UseContactsTabsAndListsReturnType;
    selectedUsers: UseArrayReturnType<CardTypes.CardListItem>;
};

function UsersList(props: Props) {
    const { tabsAndLists, selectedUsers } = props;

    const found = tabsAndLists.foundContacts || tabsAndLists.foundEmployees || [];

    return (
        <div className={styles.wrapper}>
            {!!tabsAndLists.searchInput.value && !found.length && <Icons.Picture variant="not-found" size={233} />}
            {!!found.length &&
                found.map((i) => (
                    <Card.List
                        key={i.id}
                        sortByName
                        selected={selectedUsers}
                        items={found?.map((i: any) => {
                            return {
                                id: i?.id || '',
                                img: i?.avatar || '',
                                name: i?.full_name || '',
                                title: i?.full_name || '',
                                subtitle: i?.userProxy?.networkStatus || 'Не зарегистрирован',
                                payload: { id: i.user?.id },
                            };
                        })}
                    />
                ))}
        </div>
    );
}

export default UsersList;
