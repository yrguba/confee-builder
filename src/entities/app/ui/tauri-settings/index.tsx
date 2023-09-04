import React from 'react';

import { Button, Switch, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    clickCache: () => void;
    cacheSize: string;
    cacheValue: boolean;
    updateAvailable: boolean;
    updateApp?: () => void;
};

function TauriSettingsView(props: Props) {
    const { clickCache, cacheSize, cacheValue, updateAvailable, updateApp } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.switchItem}>
                    <div className={styles.titles}>
                        <Title variant="H3M">Кэш</Title>
                        <Title primary={false} variant="H4M">
                            {`Занято на диске: ${cacheSize}`}
                        </Title>
                    </div>
                    <Switch onChange={clickCache} checked={cacheValue} />
                </div>
                <div className={styles.switchItem}>
                    <div className={styles.titles}>
                        <Title variant="H3M">Кэш</Title>
                        <Title primary={false} variant="H4M">
                            {`Занято на диске: ${cacheSize}`}
                        </Title>
                    </div>
                    <Switch onChange={clickCache} checked={cacheValue} />
                </div>
            </div>
        </div>
    );
}

export default TauriSettingsView;
