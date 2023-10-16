import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Avatar, Icons, Title } from '../../../../../../shared/ui';
import { UserInfoView } from '../../../../../user';
import { Employee, EmployeeProxy } from '../../../../model/types';
import EmployeeStatusView from '../../status';

type Props = {
    employeeData: EmployeeProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function EmployeeProfileModalView(props: Props) {
    const { employeeData } = props;

    const rows: { id: number; title: string; subtitle: string; icon?: string }[] = [
        { id: 0, title: 'Отдел', subtitle: employeeData?.departments[0].name || '' },
        { id: 1, title: 'Должность', subtitle: employeeData?.position || '' },
        { id: 2, title: 'Почта', subtitle: employeeData?.email || '' },
        { id: 3, title: 'Номер телефона', subtitle: employeeData?.user.phone || '' },
    ];

    return (
        <div className={styles.wrapper}>
            <Avatar size={200} employeeStatuses={employeeData?.status} img={employeeData?.avatar} />
            <Title variant="H1" textAlign="center">
                {employeeData?.full_name}
            </Title>
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
        </div>
    );
}

export default EmployeeProfileModalView;
