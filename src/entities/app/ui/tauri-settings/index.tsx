import React from 'react';

import { Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { appService } from '../../index';

type Props = {
    updateAvailable: boolean;
    updateApp?: () => void;
    openCacheModal: () => void;
};

function TauriSettingsView(props: Props) {
    const { openCacheModal, updateAvailable, updateApp } = props;
    const { version } = appService.getProjectInfo();
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                {/* <div className={styles.item} style={{ cursor: 'pointer' }} onClick={openCacheModal}> */}
                {/*    <div className={styles.titles}> */}
                {/*        <Title variant="H3M">Кэш</Title> */}
                {/*        <Title primary={false} variant="H4M"> */}
                {/*            Управление кэшем */}
                {/*        </Title> */}
                {/*    </div> */}
                {/*    <Icons variant="arrow-drop-right" /> */}
                {/* </div> */}
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
