import React from 'react';

import { UseEasyStateReturnType, UseArrayReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse } from 'shared/ui';

import styles from './styles.module.scss';
import { employeeProxy } from '../../../../company';
import contactProxy from '../../../../contact/lib/proxy';
import { ContactProxy, UseContactsTabsAndListsReturnType } from '../../../../contact/model/types';
import { ChatProxy } from '../../../model/types';

type Props = {
    selectedContacts: UseArrayReturnType<CardTypes.CardListItem>;
    selectedEmployees: UseArrayReturnType<CardTypes.CardListItem>;
    chat: ChatProxy | BaseTypes.Empty;
    add: () => void;
    tabsAndLists: UseContactsTabsAndListsReturnType;
} & BaseTypes.Statuses;

function AddMembersInChatModalView(props: Props) {
    const { chat, selectedContacts, selectedEmployees, add, tabsAndLists, loading } = props;

    const personalUsers = chat?.is_personal ? (tabsAndLists.searchInput.value ? tabsAndLists.foundContacts : tabsAndLists.activeList) : null;
    const employeeUsers = !chat?.is_personal ? (tabsAndLists.searchInput.value ? tabsAndLists.foundEmployees : null) : null;

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
                {personalUsers && (
                    <Card.List
                        sortByName
                        selected={selectedContacts}
                        items={personalUsers?.map((i: any) => {
                            const contact: ContactProxy = contactProxy(i);
                            return {
                                id: contact?.user?.id || '',
                                img: contact?.avatar || '',
                                name: contact?.full_name || '',
                                title: contact?.full_name || '',
                                subtitle: contact?.phone || '',
                                payload: { id: contact.user?.id },
                                onClick: () => '',
                                disabledSelect: !!chat?.members.find((i) => i?.id === contact.user?.id),
                            };
                        })}
                    />
                )}
                {employeeUsers && (
                    <Card.List
                        sortByName
                        selected={selectedContacts}
                        items={employeeUsers?.map((i: any) => {
                            const employee: any = employeeProxy(i);
                            return {
                                id: employee?.id || '',
                                img: employee?.avatar || '',
                                name: employee?.full_name || '',
                                title: employee?.full_name || '',
                                // subtitle: employee?.user.phone || '',
                                payload: { id: employee.user?.id },
                                onClick: () => '',
                                disabledSelect: !!chat?.members.find((i) => i?.id === employee.user?.id),
                            };
                        })}
                    />
                )}
                {!chat?.is_personal &&
                    !tabsAndLists.searchInput.value &&
                    tabsAndLists.activeList?.map((dep: any) => (
                        <Collapse
                            loading={tabsAndLists.loading}
                            openClose={(value) => value && tabsAndLists.getEmployees(dep.id)}
                            key={dep.id}
                            title={dep?.name || ''}
                        >
                            <Card.List
                                sortByName
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
                                        onClick: () => '',
                                        disabledSelect: !!chat?.employee_members.find((i) => i.id === employee?.id),
                                    } as any;
                                })}
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
