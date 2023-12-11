import React, { forwardRef, memo, useEffect } from 'react';

import { useWidthMediaQuery, useHeightMediaQuery, useRouter } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Button, IconsTypes, Card, Dropdown, Collapse, TabBar, Input, Title } from 'shared/ui';

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

    const contactsArr = tabsAndLists?.searchInput.value ? tabsAndLists.foundContacts : tabsAndLists.activeList;

    const { ref: lastItem, inView: inViewLastItem } = useInView({ delay: 200 });

    useEffect(() => {
        inViewLastItem && tabsAndLists.getNextPageEmployees();
    }, [inViewLastItem]);

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            <div className={styles.search}>
                <Input {...tabsAndLists.searchInput} prefixIcon="search" />
            </div>
            <div className={styles.tabs}>
                <TabBar clickTab={(tab) => tabsAndLists.setActiveTab(tab)} items={tabsAndLists.tabs} activeItemId={tabsAndLists.activeTab?.id} />
            </div>
            <Box.Animated visible key={pathname.split('/')[2]} className={styles.list}>
                {tabsAndLists.activeTab?.title === 'Личные' &&
                    tabsAndLists.searchInput.value &&
                    !tabsAndLists.searchLoading &&
                    !tabsAndLists.foundContacts?.length && (
                        <div style={{ marginLeft: 12 }}>
                            <Title variant="H2">ничего не найдено</Title>
                        </div>
                    )}
                {tabsAndLists.activeTab?.title !== 'Личные' &&
                    tabsAndLists.searchInput.value &&
                    !tabsAndLists.searchLoading &&
                    !tabsAndLists.foundEmployees?.length && (
                        <div style={{ marginLeft: 12 }}>
                            <Title variant="H2">ничего не найдено</Title>
                        </div>
                    )}
                {!tabsAndLists.activeList?.length ? (
                    <div style={{ marginLeft: 12 }}>
                        <Title variant="H2">Нет контактов</Title>
                    </div>
                ) : tabsAndLists.activeTab?.title === 'Личные' ? (
                    contactsArr?.map((i: any, index) => <Item key={index} contact={contactProxy(i)} {...props} />)
                ) : tabsAndLists.foundEmployees ? (
                    tabsAndLists.foundEmployees.map((i: any, index) => <Item key={index} employee={employeeProxy(i) as any} {...props} />)
                ) : (
                    tabsAndLists.activeList?.map((dep: any) => (
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
                    ))
                )}
            </Box.Animated>
        </Box.Animated>
    );
}

const Item = forwardRef((props: { contact?: ContactProxy; employee?: EmployeeProxy } & Props, ref: any) => {
    const { activeUserId, actions, clickEmployee, clickContact, tabsAndLists, contact, employee } = props;

    const smWidthSize = useWidthMediaQuery().to('sm');
    const lgWidthSize = useWidthMediaQuery().from('lg');

    const items: BaseTypes.Item<any, Actions, { action: Actions; contact: ContactProxy | null; employee: EmployeeProxy | null }>[] = [
        { id: 0, icon: <Icons variant="call-end" />, callback: actions, payload: 'audioCall', title: 'позвонить' },
        { id: 1, icon: <Icons variant="messages" />, callback: actions, payload: 'message', title: 'написать' },
        { id: 2, icon: <Icons.Player variant="mute" />, callback: actions, payload: 'mute', title: 'вкл.звук' },
        { id: 4, icon: <Icons variant="delete" />, callback: actions, payload: 'delete', title: 'удалить', hidden: !!employee },
    ];

    const id = contact?.id || employee?.id;
    const full_name = contact?.full_name || employee?.full_name;
    const phone = contact?.phone || '';
    const avatar = contact?.avatar || employee?.avatar || '';
    const status: any = employee?.status || null;

    const clickUser = () => {
        if (contact && clickContact) return clickContact(contact);
        if (employee && clickEmployee) return clickEmployee(employee);
    };

    return (
        <div ref={ref} key={id} className={`${styles.item} ${activeUserId === id ? styles.item_active : ''}`}>
            <div className={styles.body}>
                <div className={styles.card}>
                    <Card onClick={clickUser} size="l" name={full_name} img={avatar} title={full_name} subtitle={phone || ''} />
                </div>
                <div className={styles.icons}>
                    {!lgWidthSize
                        ? !smWidthSize
                            ? items
                                  .filter((i) => !i.hidden)
                                  .map((i) => (
                                      <Button.Circle
                                          key={i.id}
                                          radius={36}
                                          onClick={() =>
                                              i.callback &&
                                              i.callback({
                                                  action: i.payload,
                                                  contact: contact || null,
                                                  employee: employee || null,
                                              })
                                          }
                                          variant="inherit"
                                      >
                                          {i.icon}
                                      </Button.Circle>
                                  ))
                            : // <Icons variant="more" />
                              null
                        : null}
                </div>
            </div>
        </div>
    );
});

export default ContactsListView;
// export default memo(ContactsListView, (prevProps, nextProps): any => {
//     // if (prevProps.activeUserId !== nextProps.activeUserId) return false;
//     if (prevProps.tabsAndLists.activeTab?.id !== nextProps.tabsAndLists.activeTab?.id) return false;
//     // if (prevProps.tabsAndLists.tabs.length !== nextProps.tabsAndLists.tabs.length) return false;
//     // if (prevProps.tabsAndLists.activeList.length !== nextProps.tabsAndLists.activeList.length) return false;
//     if (prevProps.tabsAndLists.departmentsEmployees !== nextProps.tabsAndLists.departmentsEmployees) return false;
//     return true;
// });
