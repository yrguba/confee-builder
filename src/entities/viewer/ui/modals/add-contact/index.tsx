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
        codeCountry: InputTypes.UseReturnedType;
        phone: InputTypes.UseReturnedType;
    };
} & BaseTypes.Statuses;

function AddContactModalView(props: Props) {
    const { back, addContact, inputs } = props;

    const [codeCountry, setCodeCountry] = useState('+7');

    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {}, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Личная информация</Title>
            </div>
            <div className={styles.body}>
                <div className={styles.inputsName}>
                    <Input size="m" {...inputs.firstName} placeholder="Имя" />
                    <Input size="m" {...inputs.lastName} placeholder="Фамилия (необязательно)" />
                </div>
                <div className={styles.inputPhone}>
                    <Input.Countries {...inputs.codeCountry} getCode={setCodeCountry} />
                    <Input type="number" maxLength={10} size="m" {...inputs.phone} placeholder="(999) 000-00-00" />
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
