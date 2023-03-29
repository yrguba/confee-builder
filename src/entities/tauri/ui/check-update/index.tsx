import React from 'react';

import { project } from 'shared/constanst';
import { Button } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    updateApp: () => void;
    updateAvailable: boolean;
};

function CheckUpdateView(props: Props) {
    const { updateApp, updateAvailable } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>проверить доступные обновления</div>
            <div className={styles.currentVersion}>У вас установлена версия: {project.version}</div>
            {updateAvailable ? <Button onClick={() => updateApp()}>обновить</Button> : 'Нет тоступных обновлений'}
        </div>
    );
}

export default CheckUpdateView;
