import React, { useEffect, useState } from 'react';
import { number } from 'yup';

import { BaseTypes } from 'shared/types';
import { Avatar, Button, Input, InputTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { ContactProxy } from '../../../model/types';

type Props = {
    contact?: ContactProxy;
    inputs: {
        firstName: InputTypes.UseReturnedType;
        lastName: InputTypes.UseReturnedType;
    };
    save: () => void;
} & BaseTypes.Statuses;

function ChaneNameContactModalView(props: Props) {
    const { contact, inputs, save } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Title variant="H2">Редактирование</Title>
            </div>
            <div className={styles.avatar}>
                <Avatar size={140} img={contact?.avatar || ''} />
            </div>
            <div className={styles.inputs}>
                <Input maxLength={30} {...inputs.firstName} placeholder={contact?.first_name || 'имя'} />
                <Input maxLength={30} {...inputs.lastName} placeholder={contact?.last_name || 'фамилия'} />
            </div>
            <div className={styles.btn}>
                <Button onClick={save}>Сохранить</Button>
            </div>
        </div>
    );
}

export default ChaneNameContactModalView;
