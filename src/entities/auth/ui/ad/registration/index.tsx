import React from 'react';

import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, InputTypes, Box } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    emailInput: InputTypes.UseReturnedType;
    steps: UseEasyStateReturnType<'sendCode' | 'registration'>;
    sendCode: () => void;
} & BaseTypes.Statuses;

function Registration(props: Props) {
    const { emailInput, steps, sendCode } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <Title textAlign="center" textWrap variant="H2">
                    Введите код
                </Title>
                <Title textAlign="center" textWrap variant="H2">
                    {`Мы отправили код подтверждения  на ${emailInput.value}`}
                </Title>
                <Input {...emailInput} placeholder="Почта" />
                <Button disabled={emailInput.error} onClick={sendCode}>
                    {`Получить новый код через ${emailInput.value}`}
                </Button>
                <Button disabled={emailInput.error} onClick={() => steps.set('sendCode')}>
                    Назад
                </Button>
            </div>
        </div>
    );
}

export default Registration;
