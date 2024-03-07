import { relaunch } from '@tauri-apps/api/process';
import { installUpdate } from '@tauri-apps/api/updater';
import React from 'react';

import confeeLogo from 'assets/images/confeeLogo.png';
import { Box, Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useRouter } from '../../../shared/hooks';

function UpdateAppPage() {
    const { navigate } = useRouter();
    const updateApp = async () => {
        await installUpdate();
        await relaunch();
    };

    return (
        <Box.Animated transition={{ duration: 0.1 }} presence={false} visible className={styles.wrapper}>
            <div className={styles.logo}>
                <img src={confeeLogo} alt="" />
            </div>
            <div className={styles.modal}>
                <div className={styles.titles}>
                    <Title textAlign="center" variant="H1">
                        Доступно обновление
                    </Title>
                    <Title textAlign="center" textWrap primary={false} variant="H3S">
                        Чтобы воспользоваться всеми возможностями приложения, обновите его до последней версии.
                    </Title>
                    <Title textAlign="center" textWrap variant="H3S">
                        Если вы используете портативную версию - то перезапустите приложение.
                    </Title>
                </div>
                <div className={styles.btns}>
                    <Button variant="secondary" width="120px" height="40px" onClick={() => navigate(-1)}>
                        Пропустить
                    </Button>
                    <Button width="120px" height="40px" onClick={updateApp}>
                        Обновить
                    </Button>
                </div>
            </div>
        </Box.Animated>
    );
}

export default UpdateAppPage;
