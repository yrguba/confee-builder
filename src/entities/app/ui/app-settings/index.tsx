import React from 'react';

import { Button, Select } from 'shared/ui';

import styles from './styles.module.scss';
import { useTheme } from '../../../../shared/hooks';

type Props = {
    items: { id: number; title: string; value: string; onClick?: () => void }[];
};

function AppSettingsView(props: Props) {
    const { items } = props;
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
                                <Button.Link onClick={i?.onClick} active>
                                    {i.value}
                                </Button.Link>
                            ) : (
                                <Select defaultValue={i.value} items={themes} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AppSettingsView;
