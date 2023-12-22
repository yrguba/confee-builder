import React from 'react';

import { useEasyState, useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, ContextMenu, ContextMenuTypes, Dropdown, DropdownTypes, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { UserInfoView, userTypes } from '../../../../user';
import { viewerService } from '../../../../viewer';
import { CompanyCardView, CompanyTagView } from '../../../index';
import { EmployeeProxy } from '../../../model/types';

type Props = {
    employee: EmployeeProxy | BaseTypes.Empty;
    back: () => void;
    actions: userTypes.UserCardActions;
} & BaseTypes.Statuses;

function EmployeeProfileView(props: Props) {
    const { actions, employee, back, loading } = props;

    const visibleMenu = useEasyState(false);

    const viewerId = viewerService.getId();

    const sm = useWidthMediaQuery().to('sm');

    const btns: BaseTypes.Item[] = [
        // { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: actions?.audioCall },
        // { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: actions?.videoCall },
        { id: 1, title: 'Чат', icon: 'chat', payload: '', callback: actions?.getChat },
        { id: 2, title: 'Выключить уведомления', payload: '', icon: 'mute', callback: () => actions?.mute() },
        // { id: 3, title: 'Выкл', icon: 'mute', payload: '', callback: () => actions?.mute() },
    ];

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        { id: 0, title: 'Выключить уведомления', icon: <Icons.Player variant="mute" />, callback: () => actions?.mute() },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarBlock}>
                <Avatar loading={loading} circle={false} size={201} img={employee?.avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        <Title variant="H1">{employee?.full_name}</Title>
                        {employee?.companies?.length ? <CompanyTagView name="TFN" /> : null}
                    </div>
                    <ContextMenu items={menuItems} visible={visibleMenu.value} />
                    <div className={styles.btns}>
                        {viewerId === employee?.user?.id ? (
                            ''
                        ) : employee?.user ? (
                            btns.map((i) => (
                                <Button variant="shadow" width="61px" direction="vertical" onClick={i.callback}>
                                    {i.id === 2 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                                </Button>
                            ))
                        ) : (
                            <Title variant="H2">Не зарегестрирован</Title>
                        )}
                    </div>
                </div>
            </div>

            {employee?.companies?.length
                ? employee?.companies?.map((i) => (
                      <CompanyCardView
                          style={{ backgroundColor: 'var(--bg-secondary)' }}
                          key={i.id}
                          position={employee.position || ''}
                          status="in office"
                          title={i.name || ''}
                          subtitle={employee.departments[0]?.name || ''}
                      />
                  ))
                : null}

            {employee?.user && (
                <div className={styles.userInfo}>
                    <UserInfoView hiddenEmail user={employee?.userProxy || null} />
                </div>
            )}
        </div>
    );
}

export default EmployeeProfileView;
