import React, { useEffect, useState } from 'react';
import { number } from 'yup';

import { BaseTypes } from 'shared/types';
import { Button, Input, InputTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    back: () => void;
    addContact: (data: any) => void;
    inputs: {
        firstName: InputTypes.UseReturnedType;
        lastName: InputTypes.UseReturnedType;
        phone: InputTypes.UseReturnedType;
    };
} & BaseTypes.Statuses;

function AddContactModalView(props: Props) {
    const { back, addContact, inputs } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Новый контакт</Title>
            </div>
            <div className={styles.body}>
                <div className={styles.inputsName}>
                    <Input size="m" {...inputs.firstName} placeholder="Имя" />
                    <Input size="m" {...inputs.lastName} placeholder="Фамилия (необязательно)" />
                </div>
                <div className={styles.inputPhone}>
                    <Input.Phone {...inputs.phone} />
                </div>
            </div>
            <div className={styles.footer}>
                <Button width="50%" onClick={back} variant="secondary">
                    Назад
                </Button>
                <Button width="50%" onClick={addContact} variant="primary">
                    Добавить
                </Button>
            </div>
        </div>
    );
}

export default AddContactModalView;
