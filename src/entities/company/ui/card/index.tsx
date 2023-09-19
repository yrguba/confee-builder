import React from 'react';

import { useWidthMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Card, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { EmployeeStatuses } from '../../model/types';
import EmployeeStatusView from '../employee/status';

type Props = {
    title: string;
    subtitle: string;
    status: keyof typeof EmployeeStatuses;
    position: string;
} & BaseTypes.Statuses;

function CompanyCardView(props: Props) {
    const { title, status, subtitle, position } = props;
    const sm = useWidthMediaQuery().to('sm');

    return (
        <div className={styles.wrapper} style={{ width: sm ? 346 : 375 }}>
            <div className={styles.body}>
                <Card icon={<Icons.Logo variant="softworks" />} title={title} subtitle={subtitle} />
                <Title variant="H3M">{position || 'Нет данных'}</Title>
                <EmployeeStatusView status={status} />
            </div>
        </div>
    );
}

export default CompanyCardView;
