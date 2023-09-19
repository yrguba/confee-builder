import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    addClick: () => void;
    emailInput: InputTypes.UseReturnedType;
} & BaseTypes.Statuses;

function AuthAdView(props: Props) {
    const { addClick, emailInput } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <Title textWrap variant="H2">
                    Введите свою корпоративную почту, чтобы добавить рабочее пространство
                </Title>
                <Input {...emailInput} placeholder="Почта" />
                <Button disabled={emailInput.error} onClick={addClick}>
                    Добавить
                </Button>
            </div>
            <div className={styles.img}>
                <Icons.Picture variant="auth-ad" />
            </div>
        </div>
    );
}

export default AuthAdView;
