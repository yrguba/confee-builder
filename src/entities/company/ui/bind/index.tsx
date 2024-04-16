import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    onClick: () => void;
    mini?: boolean;
} & BaseTypes.Statuses;

function BindCompanyView(props: Props) {
    const { onClick, mini } = props;

    return mini ? (
        <div className={styles.addCompany} onClick={onClick}>
            <Icons variant="add-company" />
            <Title variant="H4S">Добавить корпоративную почту</Title>
            <div className={styles.plus}>+</div>
        </div>
    ) : (
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
            <Button onClick={onClick}>Добавить</Button>
        </div>
    );
}

export default BindCompanyView;
