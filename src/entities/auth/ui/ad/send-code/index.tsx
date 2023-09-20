import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, InputTypes, Box } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    sendCode: () => void;
    emailInput: InputTypes.UseReturnedType;
} & BaseTypes.Statuses;

function SendCode(props: Props) {
    const { sendCode, emailInput } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <Title textWrap variant="H2">
                    Введите свою корпоративную почту, чтобы добавить рабочее пространство
                </Title>
                <Input {...emailInput} placeholder="Почта" />
                <Button disabled={emailInput.error} onClick={sendCode}>
                    Добавить
                </Button>
            </div>
            <div className={styles.img}>
                <Icons.Picture variant="auth-ad" />
            </div>
        </div>
    );
}

export default SendCode;
