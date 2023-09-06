import React from 'react';

import { ViewerCard } from 'features/viewer';
import { Box, Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { viewerApi } from '../../../../../entities/viewer';

function Main() {
    const { data: viewerData } = viewerApi.handleGetViewer();

    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.card}>
                <ViewerCard />
            </div>
            {viewerData?.companies?.length ? null : (
                <div className={styles.addCompanyMail}>
                    <div className={styles.header}>
                        <div className={styles.icon}>
                            <Icons variant="portfolio" />
                        </div>
                        <div className={styles.titles}>
                            <Title textWrap variant="H3B">
                                Вы можете добавить свою корпоративную почту
                            </Title>
                            <Title primary={false} textWrap variant="H4M">
                                чтобы авторизоваться как сотрудник компании
                            </Title>
                        </div>
                    </div>
                    <Button>Добавить</Button>
                </div>
            )}
        </Box.Animated>
    );
}

export default Main;
