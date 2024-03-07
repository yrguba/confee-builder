import React, { Fragment } from 'react';
import { boolean } from 'yup';

import { AppStoreTypes } from 'entities/app';
import { ChatStoreTypes } from 'entities/chat';
import { UseEasyStateReturnType, UseThemeType, UseZustandTypes } from 'shared/hooks';
import { Button, Emoji, Icons, Switch, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { appService } from '../../index';

type Props = {
    visibleSwitchChatGpt: boolean;
    visibleChatGpt: ChatStoreTypes['visibleChatGpt'];
    updateAvailable: boolean;
    updateApp?: () => void;
    openCacheModal: () => void;
    notificationToggle: UseEasyStateReturnType<boolean>;
    theme: UseThemeType.UseThemeReturned;
    logout: () => void;
    openSessionModal: () => void;
    deleteAccount: () => void;
    autostart: AppStoreTypes['autostart'];
};

function AppSettingsView(props: Props) {
    const {
        visibleSwitchChatGpt,
        visibleChatGpt,
        deleteAccount,
        logout,
        openCacheModal,
        updateAvailable,
        updateApp,
        theme,
        openSessionModal,
        notificationToggle,
        autostart,
    } = props;
    const { version } = appService.getProjectInfo();

    const items = [
        {
            id: 0,
            title: 'Приложение',
            subtitle: `v${version}`,
            element: appService.tauriIsRunning && updateAvailable && (
                <Button width="90px" height="30px" onClick={updateApp}>
                    Обновить
                </Button>
            ),
        },
        {
            id: 1,
            title: 'Автостарт',
            subtitle: 'Открывать приложение при включении компьютера',
            element: <Switch onChange={autostart.toggle} checked={autostart.value} />,
            hidden: !appService.tauriIsRunning,
        },
        {
            id: 2,
            title: 'Уведомления',
            subtitle: 'Push-уведомления',
            element: <Switch onChange={notificationToggle.toggle} checked={notificationToggle.value} />,
        },
        {
            id: 3,
            title: 'Тема приложения',
            element: (
                <Switch
                    onChange={(value) => theme.set(value ? 'dark' : 'light')}
                    checked={theme.value === 'dark'}
                    checkedIcon={<Emoji.Item emoji="🌕" size={20} />}
                    uncheckedIcon={<Emoji.Item emoji="🌑" size={20} />}
                />
            ),
        },
        {
            id: 4,
            title: 'Показывать ChatGPT',
            element: <Switch onChange={visibleChatGpt.toggle} checked={visibleChatGpt.value} />,
            hidden: !visibleSwitchChatGpt,
        },
        {
            id: 5,
            title: 'Кэш',
            subtitle: 'Память устройства',
            element: <Icons variant="arrow-drop-right" />,
            onClick: openCacheModal,
            hidden: !appService.tauriIsRunning,
        },
        {
            id: 6,
            title: 'Устройства',
            subtitle: 'Активность на других устройствах: контроль для безопасности',
            element: <Icons variant="arrow-drop-right" />,
            onClick: openSessionModal,
        },
        {
            id: 7,
            title: 'Выйти из аккаунта',
            element: <Icons variant="logout" />,
            onClick: logout,
        },
        {
            id: 8,
            title: 'Удалить аккаунт',
            element: <Icons variant="delete" />,
            onClick: deleteAccount,
            red: boolean,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                {items
                    .filter((i) => !i.hidden)
                    .map((i) => (
                        <Fragment key={i.id}>
                            {i.id === 7 && <div className={styles.border} />}
                            <div className={styles.item} style={{ cursor: 'pointer' }} onClick={i.onClick && i.onClick}>
                                <div className={styles.titles}>
                                    <Title textWrap color={i.red ? 'red' : ''} variant="H3M">
                                        {i.title}
                                    </Title>
                                    <Title textWrap primary={false} variant="H4M">
                                        {i.subtitle}
                                    </Title>
                                </div>
                                <div>{i.element}</div>
                            </div>
                        </Fragment>
                    ))}
            </div>
        </div>
    );
}

export default AppSettingsView;
