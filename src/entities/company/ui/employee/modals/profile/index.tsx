import React, { Fragment } from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Icons, Switch, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { updatePhone } from '../../../../../../shared/lib';
import { AppStoreTypes } from '../../../../../app';
import { EmployeeProxy } from '../../../../model/types';
import EmployeeStatusView from '../../status';

type Props = {
    employeeData: EmployeeProxy | BaseTypes.Empty;
    openDeleteAccModal: () => void;
    companyAvatar: string;
    successRegister?: boolean;
    enableCompanyNotifications: AppStoreTypes['enableCompanyNotifications'];
} & BaseTypes.Statuses;

function EmployeeProfileModalView(props: Props) {
    const { enableCompanyNotifications, successRegister, companyAvatar, openDeleteAccModal, employeeData } = props;

    const rows: { id: number; title: string; subtitle: string; icon?: string }[] = [
        { id: 0, title: 'Отдел', subtitle: employeeData?.departments[0].name || '' },
        { id: 1, title: 'Должность', subtitle: employeeData?.position || '' },
        { id: 2, title: 'Почта', subtitle: employeeData?.email || '' },
        { id: 3, title: 'Номер телефона', subtitle: updatePhone(employeeData?.user.phone || '') },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                <Avatar size={200} img={employeeData?.avatar} networkStatus="online" />
                <Title variant="H1" textAlign="center">
                    {employeeData?.full_name}
                </Title>
            </div>
            {!!successRegister && (
                <div className={styles.successRegister}>
                    <Title color="green" textWrap variant="H4M">
                        {`Ваша почта была найдена в базе контактов компании ${employeeData?.companies[0].name}`}
                    </Title>
                </div>
            )}
            <div className={styles.rows}>
                <div className={styles.item_company}>
                    <Avatar size={40} img={companyAvatar} />
                    <Title variant="H3B">{employeeData?.companies[0].name || ''}</Title>
                </div>
                {rows.map((i) => (
                    <Fragment key={i.id}>
                        <div className={styles.item}>
                            <Title variant="H4M" primary={false}>
                                {i.title}
                            </Title>
                            <Title textWrap={i.id === 4} variant="H3M">
                                {i.subtitle}
                            </Title>
                        </div>
                        <div className={styles.border} />
                    </Fragment>
                ))}
            </div>
            <div className={styles.pushSwitch}>
                <Title color="inactive" variant="H4S">
                    Push-уведомления
                </Title>
                <Switch checked={enableCompanyNotifications.value} onChange={() => enableCompanyNotifications.set(!enableCompanyNotifications.value)} />
            </div>
            {!successRegister && (
                <div className={styles.deleteAcc} onClick={openDeleteAccModal}>
                    <Title color="red" variant="H3R">
                        Удалить корпоративный аккаунт
                    </Title>
                    <Icons variant="delete" />
                </div>
            )}
        </div>
    );
}

export default EmployeeProfileModalView;
