import React, { forwardRef, memo, useEffect } from 'react';

import { useWidthMediaQuery, useHeightMediaQuery, useRouter, useEasyState } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Button, IconsTypes, Card, Dropdown, Collapse, TabBar, Input, Title, ContextMenu, DropdownTypes, ContextMenuTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { useInView } from '../../../../shared/hooks';
import { employeeProxy } from '../../../company';
import { EmployeeProxy, Department } from '../../../company/model/types';
import contactProxy from '../../lib/proxy';
import { ContactProxy, Actions, UseContactsTabsAndListsReturnType, Contact } from '../../model/types';

type Props = {
    clickContact: (user: ContactProxy) => void;
    clickEmployee: (user: EmployeeProxy) => void;
    activeUserId: number | null;
    actions: (data?: { action: Actions; contact: ContactProxy | null; employee: EmployeeProxy | null }) => void;
    tabsAndLists: UseContactsTabsAndListsReturnType;
} & BaseTypes.Statuses;

function ContactsListView(props: Props) {
    const { activeUserId, clickContact, clickEmployee, actions, tabsAndLists, loading } = props;
    const { navigate, params, pathname } = useRouter();
    const smHeightSize = useHeightMediaQuery().to('sm');

    const { ref: lastItem, inView: inViewLastItem } = useInView({ delay: 200 });

    useEffect(() => {
        inViewLastItem && tabsAndLists.getNextPageEmployees();
    }, [inViewLastItem]);
    console.log(tabsAndLists);
    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            <div className={styles.search}>
                <Input {...tabsAndLists.searchInput} prefixIcon="search" />
            </div>
            <div className={styles.tabs}>
                <TabBar items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} />
            </div>
            <Box.Animated visible key={pathname.split('/')[2]} className={styles.list}>
                {tabsAndLists.searchInput.value && !tabsAndLists.contacts.length && !tabsAndLists.employees.length && (
                    <Icons.Picture variant="not-found" size={233} />
                )}
                {tabsAndLists.activeTab?.payload?.type === 'personal' && tabsAndLists.contacts.map((i) => <Item key={i.id} contact={i} {...props} />)}
                {tabsAndLists.activeTab?.payload?.type === 'company' &&
                    tabsAndLists.departments?.map((dep) => (
                        <Collapse
                            headerStyle={{ padding: '0 12px', width: 'calc(100% - 24px)' }}
                            openClose={(value) => value && tabsAndLists.getEmployees(dep.id)}
                            isOpen={dep.id === Number(params.department_id)}
                            key={dep.id}
                            title={dep?.name || ''}
                        >
                            {tabsAndLists.departmentsEmployees[dep.id]?.map((emp, index) => (
                                <Item
                                    ref={index + 1 === tabsAndLists.departmentsEmployees[dep.id].length ? lastItem : null}
                                    key={emp.id}
                                    employee={employeeProxy(emp) as any}
                                    {...props}
                                />
                            ))}
                        </Collapse>
                    ))}
                {/* {tabsAndLists.activeTab?.title === 'Личные' && */}
                {/*    tabsAndLists.searchInput.value && */}
                {/*    !tabsAndLists.searchLoading && */}
                {/*    !tabsAndLists.contacts?.length && ( */}
                {/*        <div style={{ marginLeft: 12 }}> */}
                {/*            <Title variant="H2">ничего не найдено</Title> */}
                {/*        </div> */}
                {/*    )} */}
                {/* {tabsAndLists.activeTab?.title !== 'Личные' && */}
                {/*    tabsAndLists.searchInput.value && */}
                {/*    !tabsAndLists.searchLoading && */}
                {/*    !tabsAndLists.employees?.length && ( */}
                {/*        <div style={{ marginLeft: 12 }}> */}
                {/*            <Title variant="H2">ничего не найдено</Title> */}
                {/*        </div> */}
                {/*    )} */}
                {/* {tabsAndLists.searchInput.value && !tabsAndLists.contacts.length && !tabsAndLists.employees.length ? ( */}
                {/*    <div style={{ marginLeft: 12 }}> */}
                {/*        <Title variant="H2">Нет контактов</Title> */}
                {/*    </div> */}
                {/* ) : tabsAndLists.activeTab?.title === 'Личные' ? ( */}
                {/*    tabsAndLists.contacts?.map((i: any, index) => <Item key={index} contact={i} {...props} />) */}
                {/* ) : tabsAndLists.employees ? ( */}
                {/*    tabsAndLists.employees.map((i: any, index) => <Item key={index} employee={i} {...props} />) */}
                {/* ) : ( */}
                {/*    tabsAndLists.departments?.map((dep: any) => ( */}
                {/*        <Collapse */}
                {/*            headerStyle={{ padding: '0 12px', width: 'calc(100% - 24px)' }} */}
                {/*            openClose={(value) => value && tabsAndLists.getEmployees(dep.id)} */}
                {/*            isOpen={dep.id === Number(params.department_id)} */}
                {/*            key={dep.id} */}
                {/*            title={dep?.name || ''} */}
                {/*        > */}
                {/*            {tabsAndLists.departmentsEmployees[dep.id]?.map((emp, index) => ( */}
                {/*                <Item */}
                {/*                    ref={index + 1 === tabsAndLists.departmentsEmployees[dep.id].length ? lastItem : null} */}
                {/*                    key={emp.id} */}
                {/*                    employee={employeeProxy(emp) as any} */}
                {/*                    {...props} */}
                {/*                /> */}
                {/*            ))} */}
                {/*        </Collapse> */}
                {/*    )) */}
                {/* )} */}
            </Box.Animated>
        </Box.Animated>
    );
}

const Item = forwardRef((props: { contact?: ContactProxy; employee?: EmployeeProxy } & Props, ref: any) => {
    const { activeUserId, actions, clickEmployee, clickContact, tabsAndLists, contact, employee } = props;

    const visibleMenu = useEasyState(false);

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        // {
        //     id: 0,
        //     icon: <Icons variant="videocam-outlined" />,
        //     callback: () => actions({ action: 'goMeet', contact: contact || null, employee: employee || null }),
        //     title: 'конференция',
        // },
        {
            id: 1,
            icon: <Icons variant="messages" />,
            callback: () => actions({ action: 'message', contact: contact || null, employee: employee || null }),
            title: 'написать',
        },
        {
            id: 2,
            icon: <Icons.Player variant="mute" />,
            callback: () => actions({ action: 'mute', contact: contact || null, employee: employee || null }),
            title: 'вкл.звук',
        },
        {
            id: 4,
            icon: <Icons variant="delete" />,
            callback: () => actions({ action: 'delete', contact: contact || null, employee: employee || null }),
            title: 'удалить',
            isRed: true,
            hidden: !!employee,
        },
    ];

    const id = contact?.id || employee?.id;
    const full_name = contact?.full_name || employee?.full_name;
    const subtitle = contact?.phone || employee?.position;
    const avatar = contact?.avatar || employee?.avatar || '';
    const status: any = employee?.status || null;

    const clickUser = () => {
        if (contact && clickContact) return clickContact(contact);
        if (employee && clickEmployee) return clickEmployee(employee);
    };

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        visibleMenu.toggle();
    };

    return (
        <div
            onContextMenu={clickContextMenu}
            onMouseLeave={() => visibleMenu.set(false)}
            ref={ref}
            key={id}
            className={`${styles.item} ${activeUserId === id ? styles.item_active : ''}`}
        >
            <ContextMenu visible={visibleMenu.value} items={menuItems} />
            <div className={styles.body}>
                <div className={styles.card}>
                    <Card onClick={clickUser} size="l" name={full_name} img={avatar} title={full_name} subtitle={subtitle || ''} />
                </div>
            </div>
        </div>
    );
});

export default ContactsListView;
