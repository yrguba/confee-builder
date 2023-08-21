import React from 'react';
import { number } from 'yup';

import { useTheme } from 'shared/hooks';
import { Button, Select, InputTypes, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    items: { id: number; title: string; value: string; onClick?: () => void }[];
    logout: () => void;
    deleteAccount: () => void;
};

function AppSettingsView(props: Props) {
    const { items, logout, deleteAccount } = props;
    const [theme, setTheme] = useTheme();

    const themes = [
        { id: 0, title: 'light', action: () => setTheme('light') },
        { id: 1, title: 'dark', action: () => setTheme('dark') },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>настройки приложения</div>
            <div className={styles.body}>
                {items.map((i) => (
                    <div key={i.id} className={styles.item}>
                        <div className={styles.item_title}>{i.title}</div>
                        <div className={styles.item_value}>
                            {i.onClick ? (
                                <Button height="12px" variant="inherit" onClick={i?.onClick} active>
                                    {i.value}
                                </Button>
                            ) : (
                                <Select defaultValue={i.value} items={themes} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={logout} width="100px">
                logout
            </Button>
            <Button onClick={deleteAccount} width="100px">
                deleteAccount
            </Button>
        </div>
    );
}

export default AppSettingsView;
