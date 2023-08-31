import React from 'react';

import { userService } from 'entities/user';
import { useWidthMediaQuery, useHeightMediaQuery, UseArrayReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button, IconsTypes, Card, Dropdown, Collapse, TabBar, Input } from 'shared/ui';

import styles from './styles.module.scss';
import { employeeProxy } from '../../../company';
import { Employee, EmployeeProxy, Company, Department } from '../../../company/model/types';
import contactProxy from '../../lib/proxy';
import { ContactProxy, Actions, UseTabsAndListsReturnType } from '../../model/types';

type Props = {
    clickContact: (user: ContactProxy) => void;
    clickEmployee: (user: EmployeeProxy, companyId: number, departmentId: number) => void;
    activeUserId: number | null;
    actions: (data?: { action: Actions; contact: ContactProxy | null }) => void;
    tabsAndLists: UseTabsAndListsReturnType;
} & BaseTypes.Statuses;

function ContactsListView(props: Props) {
    const { activeUserId, clickContact, clickEmployee, actions, tabsAndLists, loading } = props;

    const smHeightSize = useHeightMediaQuery().to('sm');

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            {!smHeightSize && (
                <div className={styles.search}>
                    <Input prefixIcon="search" />
                </div>
            )}
            <div className={styles.tabs}>
                <TabBar clickTab={(tab) => tabsAndLists.setActiveTab(tab)} items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} />
            </div>
            <div className={styles.list}>
                {tabsAndLists.activeTab?.title === 'Личные'
                    ? tabsAndLists.activeList?.map((i: any) => <Item key={i.id} contact={contactProxy(i)} {...props} />)
                    : tabsAndLists.activeList?.map((i: any) =>
                          i?.departments?.map((dep: Department) => (
                              <Collapse key={dep.id} title={dep?.name || ''}>
                                  {dep.employees.map((emp) => (
                                      <Item key={emp.id} employee={employeeProxy(emp)} {...props} companyId={i.id} departmentId={dep.id} />
                                  ))}
                              </Collapse>
                          ))
                      )}
            </div>
        </Box.Animated>
    );
}

function Item(props: { contact?: ContactProxy; employee?: EmployeeProxy; companyId?: number; departmentId?: number } & Props) {
    const { activeUserId, actions, clickEmployee, clickContact, tabsAndLists, contact, employee, companyId, departmentId } = props;

    const mdWidthSize = useWidthMediaQuery().to('md');

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants | IconsTypes.PlayerIconsVariants, Actions, { action: Actions; contact: ContactProxy | null }>[] = [
        { id: 0, icon: 'phone', callback: actions, payload: 'audioCall', title: '' },
        { id: 1, icon: 'messages', callback: actions, payload: 'message', title: '' },
        { id: 2, icon: 'mute', callback: actions, payload: 'mute', title: '' },
        { id: 4, icon: 'delete', callback: actions, payload: 'delete', title: '', hidden: !!employee },
    ];

    const id = contact?.id || employee?.id;
    const full_name = contact?.full_name || employee?.full_name;
    const phone = contact?.phone || '';
    const avatar = employee?.avatar || '';
    const status: any = employee?.status || null;

    const clickUser = () => {
        if (contact && clickContact) return clickContact(contact);
        if (employee && companyId && departmentId && clickEmployee) return clickEmployee(employee, companyId, departmentId);
    };

    return (
        <div key={id} className={`${styles.item} ${activeUserId === id ? styles.item_active : ''}`}>
            <div className={styles.body}>
                <div className={styles.card}>
                    <Card avatarStatus={status} onClick={clickUser} size="m" name={full_name} img={avatar} title={full_name} subtitle={phone || ''} />
                </div>
                <div className={styles.icons}>
                    {!mdWidthSize ? (
                        items
                            .filter((i) => !i.hidden)
                            .map((i) => (
                                <Button.Circle
                                    key={i.id}
                                    radius={36}
                                    onClick={() => i.callback && i.callback({ action: i.payload, contact: contact || null })}
                                    variant="inherit"
                                >
                                    {i.icon === 'mute' ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon as IconsTypes.BaseIconsVariants} />}
                                </Button.Circle>
                            ))
                    ) : (
                        <Dropdown.Menu items={items as any}>
                            <Icons variant="more" />
                        </Dropdown.Menu>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ContactsListView;
