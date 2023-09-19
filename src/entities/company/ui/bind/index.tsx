import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    addClick: () => void;
} & BaseTypes.Statuses;

function BindCompanyView(props: Props) {
    const { addClick } = props;

    return (
        <div className={styles.wrapper}>
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
            <Button onClick={addClick}>Добавить</Button>
        </div>
    );
}

export default BindCompanyView;
