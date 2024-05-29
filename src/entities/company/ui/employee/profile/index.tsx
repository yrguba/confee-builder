import React, { Fragment } from 'react';
import { useWindowSize } from 'react-use';

import { useEasyState, useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, ContextMenu, ContextMenuTypes, Dropdown, DropdownTypes, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { UserInfoView, userTypes } from '../../../../user';
import { viewerService, viewerStore } from '../../../../viewer';
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

    const { width } = useWindowSize();

    const viewerId = viewerStore.getState().viewer.value.id;

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
            <div className={styles.container}>
                <ContextMenu x={-208} trigger="mouseup" clickAway={() => visibleMenu.set(false)} items={menuItems} visible={visibleMenu.value} />
                <div className={styles.avatar}>
                    <Avatar loading={loading} size={width > 564 ? 201 : 100} img={employee?.avatar} />
                </div>
                <div className={styles.btns}>
                    {btns
                        .filter((i) => !i.hidden)
                        .map((i) => (
                            <Button key={i.id} variant="shadow" width="60px" direction="vertical" onClick={i.callback}>
                                {i.id === 2 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                            </Button>
                        ))}
                </div>
                <div className={styles.description}>
                    <div className={styles.name}>
                        <Title variant="H1">{employee?.full_name}</Title>
                    </div>
                    <div className={styles.networkStatus}>
                        <Title primary={false} variant="Body16">{`был(а) ${employee?.userProxy?.networkStatus}`}</Title>
                    </div>

                    {employee?.user && (
                        <div className={styles.info}>
                            <UserInfoView hiddenEmail user={employee?.userProxy || null} />
                        </div>
                    )}
                </div>
            </div>
            {employee?.companies?.length
                ? employee?.companies?.map((i) => (
                      <CompanyCardView
                          visibleArrow={false}
                          avatar={i.avatar || ''}
                          style={{ backgroundColor: 'var(--bg-secondary)' }}
                          position={employee.position || ''}
                          status="in office"
                          title={i.name || ''}
                          subtitle={employee.departments[0]?.name || ''}
                          key={i.id}
                      />
                  ))
                : null}
        </div>
    );
}

export default EmployeeProfileView;
