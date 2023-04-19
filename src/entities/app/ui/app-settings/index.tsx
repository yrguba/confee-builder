import React from 'react';

import { project } from 'shared/constanst';
import { ThemesNames } from 'shared/enums';
import { Button, Select } from 'shared/ui';

import styles from './styles.module.scss';

type Themes = {
    id: number;
    title: keyof typeof ThemesNames;
};

type Props = {
    items: { id: number; title: string; value: string; onClick?: () => void; onSelect?: (value: keyof typeof ThemesNames) => void }[];
};

function AppSettingsView(props: Props) {
    const { items } = props;

    const themes = [
        { id: 0, title: 'light' },
        { id: 1, title: 'dark_0' },
        { id: 2, title: 'dark_1' },
        { id: 3, title: 'dark_2' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>настройки приложения</div>
            <div className={styles.body}>
                {items.map((i) => (
                    <div key={i.id} className={styles.item}>
                        <div className={styles.item_title}>{i.title}</div>
                        <div className={styles.item_value}>
                            {i.onClick && (
                                <Button.Link onClick={i?.onClick} active>
                                    {i.value}
                                </Button.Link>
                            )}
                            {i.onSelect && (
                                <Select
                                    defaultValue={i.value}
                                    onChange={(theme) => i.onSelect && i.onSelect(theme as keyof typeof ThemesNames)}
                                    items={themes}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AppSettingsView;
