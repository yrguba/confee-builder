import React from 'react';
import { number } from 'yup';

import { useTheme } from 'shared/hooks';
import { Button, Select, InputTypes, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    items: { id: number; title: string; value: string; onClick?: () => void }[];
    cacheSizeInput: InputTypes.UseReturnedType;
    currentCacheSize: string | null;
};

function AppSettingsView(props: Props) {
    const { items, cacheSizeInput, currentCacheSize } = props;
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
                <div className={styles.item}>
                    <div>
                        <Title variant="Body14">Введите максимальный размер кэша в гб.</Title>
                        <Title variant="Body14">{`Занято: ${currentCacheSize}`}</Title>
                    </div>

                    <Input type="number" width="24%" height="40px" {...cacheSizeInput} />
                </div>
            </div>
        </div>
    );
}

export default AppSettingsView;
