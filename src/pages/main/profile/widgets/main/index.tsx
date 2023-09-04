import React from 'react';

import { UserCard } from 'features/user';
import { Box, Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';

function Main() {
    return (
        <Box.Animated visible className={styles.wrapper}>
            <div className={styles.card}>
                <UserCard />
            </div>
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
        </Box.Animated>
    );
}

export default Main;
