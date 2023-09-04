import React from 'react';
import { number } from 'yup';

import { UseEasyStateReturnType, useTheme, UseThemeType } from 'shared/hooks';
import { Button, Select, InputTypes, Input, Title, Switch, Box, Icons, Emoji } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    notificationActive: UseEasyStateReturnType<boolean>;
    visibleLastActive: UseEasyStateReturnType<boolean>;
    theme: UseThemeType.UseThemeReturned;
    logout: () => void;
    deleteAccount: () => void;
};

function AppSettingsView(props: Props) {
    const { notificationActive, logout, deleteAccount, visibleLastActive, theme } = props;

    const switches = [
        {
            id: 0,
            title: 'Последняя активность',
            subtitle: 'Отображать время моей последней активности в приложении',
            switch: <Switch onChange={visibleLastActive.toggle} checked={visibleLastActive.value} />,
        },
        {
            id: 1,
            title: 'Уведомления',
            subtitle: 'Push-уведомления',
            switch: <Switch onChange={notificationActive.toggle} checked={notificationActive.value} />,
        },
        {
            id: 2,
            title: 'Тема приложения',
            switch: (
                <Switch
                    onChange={(value) => theme.set(value ? 'dark' : 'light')}
                    checked={theme.value === 'dark'}
                    checkedIcon={<Emoji.Item unified="1f315" />}
                    uncheckedIcon={<Emoji.Item unified="1f311" />}
                />
            ),
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                {switches.map((i) => (
                    <div key={i.id} className={styles.switchItem}>
                        <div className={styles.titles}>
                            <Title variant="H3M">{i.title}</Title>
                            <Title primary={false} variant="H4M">
                                {i.subtitle}
                            </Title>
                        </div>
                        {i.switch}
                    </div>
                ))}
            </div>
            <div className={styles.bottom}>
                <Button onClick={logout} width="100px">
                    logout
                </Button>
                <Button onClick={deleteAccount} width="100px">
                    deleteAccount
                </Button>
            </div>
        </div>
    );
}

export default AppSettingsView;
