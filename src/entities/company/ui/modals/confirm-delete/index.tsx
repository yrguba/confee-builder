import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Button, Title } from '../../../../../shared/ui';

type Props = {
    confirmDelete: (value: boolean) => void;
} & BaseTypes.Statuses;

function ConfirmDeleteCorpAccModalView(props: Props) {
    const { confirmDelete } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title textAlign="center" textWrap variant="H2">
                    Удалить корпоративный аккаунт
                </Title>
            </div>
            <Title textAlign="center" textWrap variant="H4M">
                Вы действительно хотите удалить копоративный аккаунт?
            </Title>
            <Title textAlign="center" textWrap variant="H4M">
                Обратите внимание, что все ваши рабочие контакты и чаты также будут удалены. При этом ваш личный аккаунт и связанные с ним чаты и контакты
                сохранятся.
            </Title>
            <div className={styles.btns}>
                <Button onClick={() => confirmDelete(true)}>Да, удалить</Button>
                <Button onClick={() => confirmDelete(false)} variant="secondary">
                    Отмена
                </Button>
            </div>
        </div>
    );
}

export default ConfirmDeleteCorpAccModalView;
