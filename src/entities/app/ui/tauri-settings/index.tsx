import React from 'react';

import { UseEasyStateReturnType } from 'shared/hooks';
import { Button, Switch, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { appService } from '../../index';

type Props = {
    cacheSize: string;
    saveInCache: UseEasyStateReturnType<boolean>;
    updateAvailable: boolean;
    updateApp?: () => void;
};

function TauriSettingsView(props: Props) {
    const { cacheSize, saveInCache, updateAvailable, updateApp } = props;
    const { version } = appService.getProjectInfo();
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <div className={styles.item}>
                    <div className={styles.titles}>
                        <Title variant="H3M">Кэш</Title>
                        <Title primary={false} variant="H4M">
                            {cacheSize ? `Занято на диске: ${cacheSize || 0}` : 'Кэш отключен'}
                        </Title>
                    </div>
                    <Switch onChange={saveInCache.toggle} checked={saveInCache.value} />
                </div>
                <div className={styles.item}>
                    <div className={styles.titles}>
                        <Title variant="H3M">Приложение</Title>
                        <Title primary={false} variant="H4M">
                            {`Версия: ${version}`}
                        </Title>
                    </div>
                    {updateAvailable && (
                        <Button onClick={updateApp} width="100px">
                            обновить
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TauriSettingsView;
