import React, { useEffect } from 'react';

import { UseEasyStateReturnType, UseArrayReturnType, useEasyState } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, TabBar, Card, CardTypes, Collapse, Avatar, AvatarTypes, Box, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../../shared/lib';
import { CardListItem } from '../../../../../shared/ui/card/types';
import { chatService } from '../../../../chat';
import { ChatProxy } from '../../../../chat/model/types';
import { employeeProxy } from '../../../../company';
import { Employee, EmployeeProxy } from '../../../../company/model/types';
import { contactProxy } from '../../../../contact';
import { Contact, ContactProxy, UseContactsReturnType } from '../../../../contact/model/types';
import { userProxy } from '../../../../user';
import { User } from '../../../../user/model/types';
import { viewerStore } from '../../../../viewer';

type Props = {
    selectedUsers: UseArrayReturnType<CardTypes.CardListItem>;
    createMeet: () => void;
    tabsAndLists: UseContactsReturnType;
    chat?: ChatProxy;
    disabledDtn: boolean;
} & BaseTypes.Statuses;

function CreateCallModalView(props: Props) {
    const { disabledDtn, selectedUsers, tabsAndLists, loading, createMeet, chat } = props;

    const isSearching = !!tabsAndLists.searchInput.value;
    const activeTabIsCompany = !!tabsAndLists.activeTab?.payload?.companyId;
    const members = useEasyState<any>([]);
    const viewer = viewerStore.use.viewer();

    useEffect(() => {
        if (chat?.is_personal) {
            members.set(chat.members.filter((i) => i.id !== viewer.value.id).map((i) => userProxy(i)));
        } else {
            members.set(chat?.employee_members.filter((i) => i.user.id !== viewer.value.id).map((i) => employeeProxy(i)));
        }
    }, [chat]);

    const updUser = (user: User[]): CardListItem[] => {
        return user
            ?.filter((i) => i.id !== viewer.value.id)
            .map((i) => {
                const proxy = userProxy(i) as any;
                return {
                    id: proxy.id,
                    title: proxy.full_name,
                    subtitle: proxy.networkStatus || '',
                    img: proxy.avatar,
                };
            });
    };

    const updEmployee = (employees: Employee[]): CardListItem[] => {
        return employees
            ?.filter((i) => i.user.id !== viewer.value.id)
            .map((i) => {
                const proxy = employeeProxy(i) as any;
                return {
                    id: proxy.userProxy.id,
                    title: proxy.full_name,
                    subtitle: proxy?.userProxy?.networkStatus || 'Не зарегестрирован',
                    img: proxy.avatar,
                };
            });
    };

    const clickMember = (member: any) => {
        selectedUsers.pushOrDelete({
            id: member.id,
            title: member.full_name,
            subtitle: member?.userProxy?.networkStatus || 'Не зарегестрирован',
            img: member.avatar,
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Начать звонок</Title>
                {/* <div className={styles.search}> */}
                {/*    <Input {...tabsAndLists.searchInput} width="100%" placeholder="Поиск" prefixIcon="search" clearIcon /> */}
                {/* </div> */}
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

                {/* <TabBar bodyStyle={{ padding: '0 22px' }} items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} /> */}
            </div>

            <div className={styles.list}>
                <Card.List selected={selectedUsers} items={chat?.is_personal ? updUser(chat.members) : updEmployee(chat?.employee_members as any)} />
                {/* {isSearching && activeTabIsCompany && !tabsAndLists.employees.length && ( */}
                {/*    <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} /> */}
                {/* )} */}
                {/* {isSearching && !activeTabIsCompany && !tabsAndLists.contacts.length && ( */}
                {/*    <Icons.Picture variant="not-found" text="Пользователей с таким именем не найдено" size={233} /> */}
                {/* )} */}
                {/* {isSearching && activeTabIsCompany && <Card.List selected={selectedUsers} items={updEmployee(tabsAndLists.employees)} />} */}
                {/* {!activeTabIsCompany && <Card.List selected={selectedUsers} items={updContacts(tabsAndLists.contacts)} />} */}
                {/* {!isSearching && */}
                {/*    activeTabIsCompany && */}
                {/*    tabsAndLists.departments?.map((dep) => ( */}
                {/*        <Collapse */}
                {/*            headerStyle={{ padding: '0 12px', width: 'calc(100% - 24px)' }} */}
                {/*            openClose={(value) => value && tabsAndLists.getEmployees(dep.id)} */}
                {/*            key={dep.id} */}
                {/*            title={dep?.name || ''} */}
                {/*            // subtitle={getEnding()} */}
                {/*        > */}
                {/*            <Card.List */}
                {/*                companyNames={[tabsAndLists.activeTab?.title || '']} */}
                {/*                selected={selectedUsers} */}
                {/*                visibleLastItem={() => tabsAndLists.getNextPage('employee')} */}
                {/*                items={updEmployee(tabsAndLists.departmentsEmployees[dep.id])} */}
                {/*            /> */}
                {/*        </Collapse> */}
                {/*    ))} */}
            </div>
            <div className={styles.footer}>
                <Button variant="primary" onClick={createMeet} disabled={!selectedUsers.length || disabledDtn}>
                    Далее
                </Button>
            </div>
        </div>
    );
}

export default CreateCallModalView;
