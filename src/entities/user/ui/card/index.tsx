import React, { memo } from 'react';

import { companyTypes, EmployeeStatusView } from 'entities/company';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Dropdown, Icons, Title, DropdownTypes, Card } from 'shared/ui';

import styles from './styles.module.scss';
import { useWidthMediaQuery } from '../../../../shared/hooks';

type Props = {
    avatar: string | BaseTypes.Empty;
    name: string | BaseTypes.Empty;
    nickname: string | BaseTypes.Empty;
    phone: string | BaseTypes.Empty;
    email: string | BaseTypes.Empty;
    birth: string | BaseTypes.Empty;
    aboutMe: string | BaseTypes.Empty;
    visibleActionsMenu?: boolean;
    visibleHeader?: boolean;
    networkStatus?: string;
    type?: 'contact' | 'employee';
    companies?: companyTypes.Company[];
    departments?: companyTypes.Department[];
    actions?: {
        audioCall: () => void;
        videoCall: () => void;
        getChat: () => void;
        mute: () => void;
        delete?: () => void;
    };
} & BaseTypes.Statuses;

function UserCardView(props: Props) {
    const {
        departments,
        companies,
        actions,
        email,
        networkStatus,
        visibleHeader,
        type,
        avatar,
        name,
        nickname,
        aboutMe,
        birth,
        phone,
        loading,
        visibleActionsMenu,
    } = props;

    const secondaryInfo: { id: number; title: string; subtitle: string; hidden: boolean }[] = [
        { id: 0, title: 'Никнейм', subtitle: `@${nickname}`, hidden: !nickname },
        { id: 1, title: 'Номер телефона', subtitle: phone || '', hidden: !phone },
        { id: 2, title: 'Дата рождения', subtitle: birth || '', hidden: !birth },
        { id: 3, title: 'Почта', subtitle: email || '', hidden: !email },
        { id: 4, title: 'О себе', subtitle: '', hidden: true },
    ];

    const sharedBtn: BaseTypes.Item[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: actions?.audioCall },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: actions?.videoCall },
        { id: 2, title: 'Чат', icon: 'chat', payload: '', callback: actions?.getChat },
    ];

    const moreBtn: DropdownTypes.DropdownMenuItem[] = [
        { id: 0, title: 'Выключить уведомления', icon: <Icons.Player variant="mute" />, callback: () => actions?.mute() },
        { id: 1, title: 'Удалить', icon: <Icons variant="delete" />, callback: () => actions?.delete && actions?.delete() },
    ];

    const btnsContact: BaseTypes.Item[] = [...sharedBtn, { id: 4, title: 'Ещё', icon: 'more', payload: '', callback: () => '' }];
    const btnsEmployee: BaseTypes.Item[] = [...sharedBtn, { id: 5, title: 'Выкл.', icon: 'mute', payload: '', callback: actions?.mute }];

    const sm = useWidthMediaQuery().to('sm');

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            {visibleHeader && (
                <div className={styles.header}>
                    <div className={styles.name}>
                        <Title variant="H1">{name || ''}</Title>
                        <Button tag>dw</Button>
                    </div>
                    <Title textAlign="right" variant="H4M">
                        {networkStatus}
                    </Title>
                </div>
            )}
            <div className={styles.body}>
                <div className={styles.avatar} style={{ width: sm ? 346 : 375 }}>
                    <Avatar circle={false} size={sm ? 346 : 375} img={avatar} />
                    {visibleActionsMenu && (
                        <div className={styles.btns} style={{ width: sm ? 346 : 375 }}>
                            {!nickname ? (
                                <div className={styles.noRegister}>
                                    <Title textAlign="center" variant="H2">
                                        Не зарегистрирован в Confee
                                    </Title>
                                </div>
                            ) : type === 'contact' ? (
                                btnsContact.map((i) => (
                                    <Dropdown.Menu position="bottom-center" items={moreBtn} key={i.id} disabled={i.title !== 'Ещё'}>
                                        <Button
                                            direction="vertical"
                                            prefixIcon={i.id === 3 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                                            onClick={i.callback}
                                        >
                                            {i.title}
                                        </Button>
                                    </Dropdown.Menu>
                                ))
                            ) : (
                                btnsEmployee.map((i) => (
                                    <Button
                                        key={i.id}
                                        direction="vertical"
                                        prefixIcon={i.icon === 'mute' ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                                        onClick={i.callback}
                                    >
                                        {i.title}
                                    </Button>
                                ))
                            )}
                        </div>
                    )}
                </div>

                <div className={styles.info}>
                    {!visibleHeader && <Title variant="H1">{name || ''}</Title>}
                    <div className={styles.secondaryInfo}>
                        {secondaryInfo
                            .filter((i) => !i.hidden)
                            .map((i) => (
                                <div key={i.id} className={styles.item}>
                                    <Title variant="H4M" primary={false}>
                                        {i.title}
                                    </Title>
                                    <Title variant="H3M">{i.subtitle}</Title>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {companies?.length ? (
                <div className={styles.companies}>
                    {companies?.map((i) => (
                        <div key={i.id} className={styles.item} style={{ width: sm ? 346 : 375 }}>
                            <div className={styles.body}>
                                <Card
                                    icon={<Icons.Logo variant="softworks" />}
                                    title={i.name || ''}
                                    subtitle={departments?.length ? departments[0].name || '' : ''}
                                />
                                <Title variant="H3M">Нет данных</Title>
                                <EmployeeStatusView status="in office" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </Box.Animated>
    );
}

export default UserCardView;
