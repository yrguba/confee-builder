import React, { useState } from 'react';

import { UseInputReturnedTypes } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Icons, Input, LoadingIndicator, Select, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { useInput, useStyles } from '../../../../../shared/hooks';
import { ViewerTypes } from '../../../../viewer';
import { User } from '../../../model/types';
import UserStatusView from '../../status';

type Props = {
    back: () => void;
    addContact: (data: any) => void;
    inputs: {
        firstName: UseInputReturnedTypes;
    };
} & BaseTypes.Statuses;

function AddContactModalView(props: Props) {
    const { back, addContact, inputs } = props;

    const [codeCountry, setCodeCountry] = useState('+7');

    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Личная информация</Title>
            </div>
            <div className={styles.body}>
                <div className={styles.inputsName}>
                    <Input size="m" {...inputs.firstName} placeholder="Имя" />
                    <Input size="m" {...inputs.firstName} placeholder="Фамилия (необязательно)" />
                </div>
                <div className={styles.inputPhone}>
                    <Input.Countries getCode={setCodeCountry} />
                    <Input size="m" placeholder="(999) 000-00-00" />
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
