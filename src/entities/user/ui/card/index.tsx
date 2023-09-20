import React, { memo } from 'react';

import { companyTypes, EmployeeStatusView, CompanyCardView } from 'entities/company';
import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Dropdown, Icons, Title, DropdownTypes, AvatarTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { UserProxy, UserCardActions } from '../../model/types';

type Props = {
    user?: UserProxy | null;
    name?: string;
    avatar?: string;
    visibleActionsMenu?: boolean;
    visibleHeader?: boolean;
    networkStatus?: string;
    clickSettings?: () => void;
    type?: 'contact' | 'employee' | 'user' | 'viewer';
    companies?: companyTypes.Company[];
    departments?: companyTypes.Department[];
    resize?: boolean;
    actions?: UserCardActions;
    avatarActions?: AvatarTypes.AvatarChangeActions;
    clickAvatar?: () => void;
    position?: string;
} & BaseTypes.Statuses;

function UserCardView(props: Props) {
    const {
        clickSettings,
        departments,
        companies,
        actions,
        avatarActions,
        clickAvatar,
        user,
        avatar,
        name,
        networkStatus,
        visibleHeader,
        type,
        loading,
        visibleActionsMenu,
        resize = true,
        position,
    } = props;

    const secondaryInfo: { id: number; title: string; subtitle: string; hidden: boolean }[] = [
        { id: 0, title: 'Никнейм', subtitle: `@${user?.nickname}`, hidden: !user?.nickname },
        { id: 1, title: 'Номер телефона', subtitle: user?.phone || '', hidden: !user?.phone },
        { id: 2, title: 'Дата рождения', subtitle: user?.formatted_birth || '', hidden: !user?.formatted_birth },
        { id: 3, title: 'Почта', subtitle: user?.email || '', hidden: !user?.email },
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
    const AvatarSize = resize ? (sm ? 346 : 375) : 375;
    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            {visibleHeader && (
                <div className={styles.header}>
                    <div className={styles.name}>
                        <Title variant="H1">{user?.full_name || name || ''}</Title>
                        <Button tag>TFN</Button>
                    </div>
                    <Title textAlign="right" variant="H4M">
                        {networkStatus}
                    </Title>
                </div>
            )}
            <div className={styles.body}>
                <div className={styles.avatar} style={{ width: AvatarSize }}>
                    {avatarActions ? (
                        <Avatar.Change
                            clickAvatar={clickAvatar}
                            dropdownLeft={270}
                            dropdownTop={280}
                            {...avatarActions}
                            circle={false}
                            size={AvatarSize}
                            img={user?.avatar || avatar}
                        />
                    ) : (
                        <Avatar clickAvatar={clickAvatar} circle={false} size={AvatarSize} img={user?.avatar || avatar} />
                    )}

                    {clickSettings && <Button onClick={clickSettings}>Редактировать личную информацию</Button>}
                    {visibleActionsMenu && (
                        <div className={styles.btns} style={{ width: AvatarSize }}>
                            {!user?.nickname ? (
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
                    {!visibleHeader && <Title variant="H1">{user?.full_name || ''}</Title>}
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
                {companies?.length ? (
                    <div className={styles.companies}>
                        {companies?.map((i) => (
                            <CompanyCardView
                                key={i.id}
                                position={position || ''}
                                status="in office"
                                title={i.name || ''}
                                subtitle={departments?.length ? departments[0].name || '' : ''}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </Box.Animated>
    );
}

export default UserCardView;
