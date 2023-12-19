import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { EmployeeProxy } from '../../../../model/types';

type Props = {
    employeeData: EmployeeProxy | BaseTypes.Empty;
    openDeleteAccModal: () => void;
} & BaseTypes.Statuses;

function EmployeeProfileModalView(props: Props) {
    const { openDeleteAccModal, employeeData } = props;

    const rows: { id: number; title: string; subtitle: string; icon?: string }[] = [
        { id: 0, title: 'Отдел', subtitle: employeeData?.departments[0].name || '' },
        { id: 1, title: 'Должность', subtitle: employeeData?.position || '' },
        { id: 2, title: 'Почта', subtitle: employeeData?.email || '' },
        { id: 3, title: 'Номер телефона', subtitle: employeeData?.user.phone || '' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                <Avatar size={200} img={employeeData?.avatar} />
                <Title variant="H1" textAlign="center">
                    {employeeData?.full_name}
                </Title>
            </div>
            <div className={styles.rows}>
                <div className={styles.item_company}>
                    <Icons.Logo variant="softworks" />
                    <Title variant="H3B">{employeeData?.companies[0].name || ''}</Title>
                </div>
                {rows.map((i) => (
                    <div key={i.id} className={styles.item}>
                        <Title variant="H4M" primary={false}>
                            {i.title}
                        </Title>
                        <Title textWrap={i.id === 4} variant="H3M">
                            {i.subtitle}
                        </Title>
                    </div>
                ))}
            </div>
            <div className={styles.deleteAcc} onClick={openDeleteAccModal}>
                <Title color="red" variant="H3R">
                    Удалить корпоративный аккаунт
                </Title>
                <Icons variant="delete" />
            </div>
        </div>
    );
}

export default EmployeeProfileModalView;
