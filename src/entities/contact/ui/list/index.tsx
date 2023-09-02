import React, { forwardRef, useEffect } from 'react';

import { useWidthMediaQuery, useHeightMediaQuery, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Button, IconsTypes, Card, Dropdown, Collapse, TabBar, Input } from 'shared/ui';

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

    const contactsArr = tabsAndLists.foundContacts?.length ? tabsAndLists.foundContacts : tabsAndLists.activeList;

    const { ref: lastItem, inView: inViewLastItem } = useInView({ delay: 200 });

    useEffect(() => {
        inViewLastItem && tabsAndLists.getNextPageEmployees();
    }, [inViewLastItem]);

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
            <Box.Animated visible key={pathname} className={styles.list}>
                {tabsAndLists.activeTab?.title === 'личные'
                    ? contactsArr?.map((i: any, index) => <Item key={index} contact={contactProxy(i)} {...props} />)
                    : tabsAndLists.foundEmployees?.length
                    ? tabsAndLists.foundEmployees.map((i: any, index) => <Item key={index} employee={employeeProxy(i)} {...props} />)
                    : tabsAndLists.activeList?.map((i: any) =>
                          i?.departments?.map((dep: Department) => (
                              <Collapse onTitleClick={() => tabsAndLists.getEmployees(dep.id)} key={dep.id} title={dep?.name || ''}>
                                  {tabsAndLists.departmentsEmployees[dep.id]?.map((emp) => (
                                      <Item ref={lastItem} key={emp.id} employee={employeeProxy(emp)} {...props} />
                                  ))}
                              </Collapse>
                          ))
                      )}
            </Box.Animated>
        </Box.Animated>
    );
}

const Item = forwardRef((props: { contact?: ContactProxy; employee?: EmployeeProxy } & Props, ref: any) => {
    const { activeUserId, actions, clickEmployee, clickContact, tabsAndLists, contact, employee } = props;

    const mdWidthSize = useWidthMediaQuery().to('md');

    const items: BaseTypes.Item<
        IconsTypes.BaseIconsVariants | IconsTypes.PlayerIconsVariants,
        Actions,
        { action: Actions; contact: ContactProxy | null; employee: EmployeeProxy | null }
    >[] = [
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
        if (employee && clickEmployee) return clickEmployee(employee);
    };

    return (
        <div ref={ref} key={id} className={`${styles.item} ${activeUserId === id ? styles.item_active : ''}`}>
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
                                    onClick={() => i.callback && i.callback({ action: i.payload, contact: contact || null, employee: employee || null })}
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
});

export default ContactsListView;
